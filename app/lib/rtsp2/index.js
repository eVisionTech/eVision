/**
 * Created by Andrew D.Laptev<a.d.laptev@gmail.com> on 30.03.15.
 */

const spawn = require('child_process').spawn
	, EventEmitter = require('events').EventEmitter
	, util = require('util')
	, TRASSIR_Cloud = require('./trassir_cloud');
	;

/**
 * Stream constructor
 * @param {object} options
 * @param {string} options.input Stream uri, for example rtsp://r3---sn-5hn7su76.c.youtube.com/CiILENy73wIaGQnup-1SztVOYBMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp
 * @param {number|string} [options.rate] Framerate
 * @param {string} [options.resolution] Resolution in WxH format
 * @param {string|number} [options.quality] JPEG quality
 * @param {Array<string>} [options.arguments] Custom arguments for ffmpeg
 * @constructor
 */
var FFMpeg = function(options) {
	if (options.input) {
		this.input = options.input;
	} else {
		throw new Error('no `input` parameter');
	}
	this.rate = options.rate || 5;
	this.resolution = options.resolution;
	this.resize = options.resize;
        this.crop = options.crop;
	this.quality = (options.quality === undefined || options.quality === "") ? 3 : options.quality;
	this.device_type = options.device_type;

	this.arguments = options.arguments || [];
	this.imageData = []; // Store the entire data image into this variable. This attribute is replaced each time a full image is received from the stream.

	this.on('newListener', newListener.bind(this));
	this.on('removeListener', removeListener.bind(this));
	if (Object.observe && (typeof Proxy !== 'function')) {
		Object.observe(this, observer.bind(this));
	}
};

util.inherits(FFMpeg, EventEmitter);

/**
 * FFMpeg command name
 * @type {string}
 */
FFMpeg.cmd = 'ffmpeg';

function newListener(event) {
	if (event === 'data' && this.listeners(event).length === 0) {
		this.start();
	}
}

function removeListener(event) {
	if (event === 'data' && this.listeners(event).length === 0) {
		this.stop();
	}
}

function observer(changes) {
	if (changes.some(function(change) {
		return change.type === 'update';
	})) {
		this.restart();
	}
}

FFMpeg.prototype._args = function() {
	return new Promise((resolve, reject) => {
    function calcCrop(stringCrop) {
        let array = stringCrop.split(':', 4);
        let output = "";
        for (var i in array) {
            try {
                array[i] = parseFloat(eval(array[i]));
            } catch (e) {
                return "in_w:in_h";
            }
            if ((isNaN(array[i])) || (array[i]>1)) {
                return "in_w:in_h";
            } 
            switch (i) {
                case '0':
                    output = output + array[i] + "*in_w:";
                    break;
                case '1':
                    output = output + array[i] + "*in_h:";
                    break;
                case '2':
                    output = output + array[i] + "*in_w:";
                    break;
                case '3':
                    output = output + array[i] + "*in_h";
                    break;
            }
        }
        return output;
	}
	
		function args(input, params) {
			return params.arguments.concat(
				['-loglevel', 'error']
				, input == 'webcam' ? ['-f','vfwcap', '-i', 0] : ['-i', input]
				, params.rate && params.device_type != 'TRASSIR_Cloud' ? ['-r', params.rate.toString()] :[]
				, params.quality ? ['-q:v', params.quality.toString()] : []
				, params.resize && !params.crop ? ['-filter:v', 'scale=' + params.resize.replace('x',':')] : []
				, params.crop ? ['-filter_complex', 'crop=' + calcCrop(params.crop.toString())] : [],
	[
		//, '-vf', 'fps=25'
		//, '-b:v', '32k'
		'-f', 'image2'
		, '-update', '1'
		, '-'
	]
			, params.resolution ? ['-s', params.resolution] : []);
		}
	
		let that = this;	
	
		if (this.device_type == 'TRASSIR_Cloud') {
			TRASSIR_Cloud.get_video(this.input, (err, new_url) => {
				if (err) {
					console.error(err);
					resolve(args(that.input, that));
				}
				if (!new_url) resolve(args(that.input, that));
				resolve(args(new_url, that));
			})
		} else	
			resolve(args(this.input, this));
	});
};

/**
 * Start ffmpeg spawn process
 */
FFMpeg.prototype.start = async function() {
	var self = this;
	let _args = await this._args();
	console.log(FFMpeg.cmd + ' ' + _args.join(' '));
	this.child = spawn(FFMpeg.cmd, _args);
	this.child.stdout.on('_data', function(data){
		//The image can be composed of one or multiple chunk when receiving stream data.
		//Store all bytes into an array until we meet flag "FF D9" that mean it's the end of the image then we can send all data in order to display the full image.
		for(var idx = 0; idx < data.length-1;idx++){
			offset = data[idx].toString(16);
			offset2 = data[idx+1].toString(16);

			if(offset == "ff" && offset2 == "d9"){
				self.imageData.push(data[idx]);
				self.imageData.push(data[idx+1]);
				self.emit('data', Buffer.from(self.imageData));
				self.imageData = [];
				self.dataReceived = true;
			}else{
				self.imageData.push(data[idx]);
			}
		}
	});
    this.child.stdout.on('data', function(data){
    //console.log('data',data.length);
    //The image can be composed of one or multiple chunk when receiving stream data.
    //Store all bytes into an array until we meet flag "FF D9" that mean it's the end of the image then we can send all data in order to display the full image.
    for(var idx = 0; idx < data.length;idx++) self.imageData.push(data[idx])
    var _end;
    for(var idx = 0; idx < self.imageData.length-1;idx++){
        var offset = self.imageData[idx].toString(16);
        var offset2 = self.imageData[idx+1].toString(16);
        if(offset == "ff" && offset2 == "d9") {
	_end = idx;
	//break;
        }
    }
    if (_end) {
        var _buff = Buffer.from(self.imageData.splice(0,_end+2));
        self.imageData.splice(0,2);
        //console.log('_buff',_buff.toString('base64'));
        //console.log(_buff[0],_buff[1], _buff[2],'...',_buff[_buff.length - 3],_buff[_buff.length - 2],_buff[_buff.length - 1]);
        if (_buff[1] != '0xD8')
        _buff  = Buffer.concat([Buffer.from(['0xFF','0xD8']), _buff])
        //console.log(_buff[0],_buff[1], _buff[2],'...',_buff[_buff.length - 3],_buff[_buff.length - 2],_buff[_buff.length - 1]);

        self.emit('data', _buff);

        //else(console.log(_buff[2],_buff[3],_buff[4],_buff[5],_buff[6]))
            }
    self.dataReceived = true;

    });
	this.child.stderr.on('data', function(data) {
		self.emit('error', data.toString('utf8'));
	});
	this.emit('start');
	this.child.on('close', function(code) {
		if (code === 0) {
			setTimeout(FFMpeg.prototype.start.bind(this), 1000);
		}
	}.bind(this));

	if (this.restartObserver) clearInterval(this.restartObserver);
	this.restartObserver = setInterval(function(){if (!self.dataReceived) {self.restart();console.log('Data not received. Restarting...');}; self.dataReceived = false;}, 10000);

	/*this.child.on('error', function(code) {
	});*/
};

/**
 * Stop ffmpeg spawn process
 */
FFMpeg.prototype.stop = function() {
	if (this.child) {
	    this.child.kill();
    	delete this.child;
	}
	clearInterval(this.restartObserver);
	this.emit('stop');
};

/**
 * Restart ffmpeg spawn process
 */
FFMpeg.prototype.restart = function() {
        //console.log('FFMpeg restart');
	if (this.child) {
		this.stop();
		this.start();
	}
};

if (typeof Proxy === 'function') {
	FFMpeg = new Proxy(FFMpeg, {
		set: function(target, property) {
			if (property !== 'super_' && target[property] !== undefined) {
				target.restart();
			}
			return true;
		}
	});
}

module.exports.FFMpeg = FFMpeg;

var ANPR = function(options) {
	if (options.input) {
		this.input = options.input;
	} else {
		throw new Error('no `input` parameter');
	}
	this.rate = options.rate || 5;
	this.resolution = options.resolution;
	this.resize = options.resize
        this.crop = options.crop;
	this.quality = (options.quality === undefined || options.quality === "") ? 3 : options.quality;

	this.arguments = options.arguments || [];
	this.imageData = []; // Store the entire data image into this variable. This attribute is replaced each time a full image is received from the stream.

	this.on('newListener', newListener.bind(this));
	this.on('removeListener', removeListener.bind(this));
	if (Object.observe && (typeof Proxy !== 'function')) {
		Object.observe(this, observer.bind(this));
	}
};

util.inherits(ANPR, EventEmitter);

/**
 * ANPR command name
 * @type {string}
 */
ANPR.cmd = './rtsp_alpr';

ANPR.prototype._args = function() {
	return this.arguments.concat([
		this.input
	]);
};

/**
 * Start ANPR spawn process
 */
ANPR.prototype.start = function() {
	var self = this;
	console.log(ANPR.cmd + ' ' + this._args().join(' '));

	this.child = spawn(ANPR.cmd, this._args());
	this.child.stdout.on('data', function(data){
    var chunk = data.toString();
    chunk = chunk.split("}");
    self.imageData.push(chunk[0]);
    if (chunk[1]) {
		    var obj = self.imageData.join("")+"}";
		    //console.log(obj);
        self.imageData = [chunk[1].trim()];
  		try {
            self.emit('data', JSON.parse(obj));
            self.dataReceived = true;
			} catch(e){}
		}
	});
	this.child.stderr.on('data', function(data) {
		//console.error(data.toString());
		//throw new Error(data);
	});
	this.emit('start');
	this.child.on('close', function(code) {
		if (code === 0) {
			setTimeout(ANPR.prototype.start.bind(this), 1000);
		}
	}.bind(this));

	if (this.restartObserver) clearInterval(this.restartObserver)
	this.restartObserver = setInterval(function(){if (!self.dataReceived) {self.restart();console.log('Data not received. Restarting...');}; self.dataReceived = false;}, 10000);

	if (this._restartObserver) clearInterval(this._restartObserver)
	this._restartObserver = setInterval(function(){self.restart();console.log('_restarting...');}, 300000);

	/*this.child.on('error', function(code) {
	});*/
};

/**
 * Stop ANPR spawn process
 */
ANPR.prototype.stop = function() {
	if (this.child) {
	    this.child.kill();
    	    delete this.child;
	}
	this.emit('stop');
};

/**
 * Restart ANPR spawn process
 */
ANPR.prototype.restart = function() {
	if (this.child) {
		this.stop();
		this.start();
	}
};

if (typeof Proxy === 'function') {
	ANPR = new Proxy(ANPR, {
		set: function(target, property) {
			if (property !== 'super_' && target[property] !== undefined) {
				target.restart();
			}
			return true;
		}
	});
}

module.exports.ANPR = ANPR;

var ANPR_python = function(options) {
	if (options.input) {
		this.input = options.input;
		this.resize = options.resize;
		this.crop = options.crop;
	} else {
		throw new Error('no `input` parameter');
	}
	this.rate = options.rate || 5;
	this.resolution = options.resolution;
	this.resize = options.resize
        this.crop = options.crop;
	this.quality = (options.quality === undefined || options.quality === "") ? 3 : options.quality;
	// options.arguments.push('./anpr-src/haarcascade_russian_plate_number.xml', './anpr-src/haarcascade_russian_plate_number.xml')
	this.arguments = options.arguments || [];
	this.imageData = []; // Store the entire data image into this variable. This attribute is replaced each time a full image is received from the stream.

	this.on('newListener', newListener.bind(this));
	this.on('removeListener', removeListener.bind(this));
	if (Object.observe && (typeof Proxy !== 'function')) {
		Object.observe(this, observer.bind(this));
	}
};

util.inherits(ANPR_python, EventEmitter);

/**
 * ANPR command name
 * @type {string}
 */
if (process.platform === "win32") {
	ANPR_python.cmd = "_dlib/main.exe"
	ANPR_python.prototype._args = function() {
		let resize = this.resize.split('x');
		let crop = [];
		let cw, ch, cx, cy, orh, orw;
		if (this.crop) {
			crop = this.crop.split(':');
			cw = crop[0].split('/')[0];
			ch = crop[1].split('/')[0];
			cx = crop[2].split('/')[0];
			cy = crop[3].split('/')[0];
			orw = crop[0].split('/')[1];
			orh = crop[1].split('/')[1];
		}
		return this.arguments.concat(
			['-v', this.input],
			['-xmla', './_dlib/haarcascade_russian_plate_number.xml'],
			['-xmlb', './_dlib/haarcascade_russian_plate_number_symbol.xml'],
			resize.length == 2 && !this.crop ? ['-rw', resize[0], '-rh', resize[1]] : [],
			crop.length == 4 ? ['-cw', cw, '-ch', ch, '-cx', cx, '-cy', cy, '-orh', orh, '-orw', orw] : [],
			Number.isInteger(this.rate) ? []: ['-fps', this.rate]
		);
	};
} else {
	ANPR_python.cmd = 'python';
	ANPR_python.prototype._args = function() {
		let resize = this.resize.split('x');
		let crop = [];
		let cw, ch, cx, cy, orh, orw;
		if (this.crop) {
			crop = this.crop.split(':');
			cw = crop[0].split('/')[0];
			ch = crop[1].split('/')[0];
			cx = crop[2].split('/')[0];
			cy = crop[3].split('/')[0];
			orw = crop[0].split('/')[1];
			orh = crop[1].split('/')[1];
		}
		return this.arguments.concat(
			['./anpr-src/python/main.py'],
			['-v', this.input],
			['-xmla', './anpr-src/haarcascade_russian_plate_number.xml'],
			['-xmlb', './anpr-src/haarcascade_russian_plate_number_symbol.xml'],
			resize.length == 2 && !this.crop ? ['-rw', resize[0], '-rh', resize[1]] : [],
			crop.length == 4 ? ['-cw', cw, '-ch', ch, '-cx', cx, '-cy', cy, '-orh', orh, '-orw', orw] : [],
			Number.isInteger(this.rate) ? []: ['-fps', this.rate]
		);
	};
}

/**
 * Start ANPR_python spawn process
 */
ANPR_python.prototype.start = function() {
	var self = this;
	var dataReceived;
	console.log(ANPR_python.cmd + ' ' +this._args().join(' '));

	this.child = spawn(ANPR_python.cmd, this._args());
	this.child.stdout.on('data', function(data) {
		let chunk = data.toString();
		chunk = chunk.split('}');
		self.imageData.push(chunk[0]);	
		if (chunk.length == 2) {			
			let obj = self.imageData.join('') + '}';
			self.imageData = [chunk[1].trim()];
			try {
				let json = JSON.parse(obj)
				json.frame = 'data:image/jpeg;base64,' + json.frame.replace("b\'", "").replace("'", "")
				json.areas = json.areas.map(area => {return 'data:image/jpeg;base64,' + area.replace("b\'", "").replace("'", "")})
				self.emit('data', json);
				dataReceived = true;
			} catch(e) {				
				// console.log('Error: ANPR_python1:', e)
			}
		} else if (chunk.length > 2) {
			self.imageData = [];
			for (let i = 1; i < chunk.length - 1; i++) {
				let obj = chunk[i] + '}';
				try {
					let json = JSON.parse(obj)
					json.frame = 'data:image/jpeg;base64,' + json.frame.replace("b\'", "").replace("'", "")
					json.areas = json.areas.map(area => {return 'data:image/jpeg;base64,' + area.replace("b\'", "").replace("'", "")})
					self.emit('data', json);
					dataReceived = true;
				} catch(e) {				
					// console.log('Error: ANPR_python2:', e)
				}
			}
		}
	});

	this.child.stderr.on('data', function(data) {
		console.log(data.toString());
	});

	this.emit('start');

	this.child.on('close', function(code) {		
		if (code === 0) {
			setTimeout(ANPR_python.prototype.start.bind(this), 1000);
		}
	}.bind(this));

	if (this.restartObserver) clearInterval(this.restartObserver)
	this.restartObserver = setInterval(function(){if (!dataReceived) {self.restart();console.log('Data not received. Restarting...');}; dataReceived = false;}, 25000);

	/*this.child.on('error', function(code) {
	});*/
};

/**
 * Stop ANPR spawn process
 */
ANPR_python.prototype.stop = function() {
	if (this.child) {
	    this.child.kill();
		delete this.child;
	}
	clearInterval(this.restartObserver);
	this.emit('stop');
};

/**
 * Restart ANPR spawn process
 */
ANPR_python.prototype.restart = function() {
	if (this.child) {
		this.stop();
		this.start();
	}
};

if (typeof Proxy === 'function') {
	ANPR_python = new Proxy(ANPR_python, {
		set: function(target, property) {
			if (property !== 'super_' && target[property] !== undefined) {
				target.restart();
			}
			return true;
		}
	});
}

module.exports.ANPR_python = ANPR_python;
