const ftpd = require('ftpd');
const fs = require('fs');
const ip = require("ip");

module.exports = function(run,params,event,wss) {
    if (!params.ftp.enable) return;
    function faceDetect(frame, address) {
        var image64 = 'data:image/jpeg;base64,' + new Buffer(frame).toString('base64');
        function onResult(obj) {
            if (obj.action == 'face' && obj.data && obj.data[0]) {
                var evt = event(obj.data[0], params, frame, wss) || {trustFace: false, sendEvent: false};
                if (!evt.trustFace) obj.data[0].name = '*';
                return [evt]
            }
            return [];
        }
            var _params = Object.assign({}, params);
	    _params.device.name = address;
            run(image64, _params, onResult);
    }

    var options = {
        host: process.env.IP || ip.address(),
        port: process.env.FTPPORT || params.ftp.port,
        getInitialCwd: function() {
            return '/';
        },
        getRoot: function() {
            return process.cwd();
        },
        useWriteFile: true,
        useReadFile: false
    }

    var ftpServer = new ftpd.FtpServer(options.host, options);
    var dirs = {};
    var images = {};
    var minFullImageSize = 15000;

    ftpServer.on('client:connected', function(conn) {
        var rfs = new restrictedFs(conn);

        var username;

        //console.log('Ftp client connected from ' + conn.socket.remoteAddress);

        conn.on('command:user', function(user, success, failure) {
            username = user;
            //(user == options.ftpUsername) ? success(): failure();
            (user) ? success(): failure();
        });

        conn.on('command:pass', function(pass, success, failure) {
            // check the password 
            //(pass == options.ftpPassword) ? success(username,rfs): failure();
            (pass) ? success(username, rfs): failure();
        });
    })


    var restrictedFs = function(conn) {

        this.unlink = function(path, callback) {
	    console.log('unlink', path)
            if (callback)
                callback();
        };

        this.readdir = function(path, callback) {
	    //console.log('readdir',path,dirs);
            if (callback)
                callback(null, Object.keys(dirs[path] || {}));
        };

        this.mkdir = function(path, mode, callback) {
            console.log('mkdir', path);
            if (callback)
                callback();
        };

        this.rmdir = function(path, callback) {
	    console.log('rmdir', path)
            if (callback)
                callback();
        };

        this.rename = function(oldPath, newPath, callback) {
            if (callback)
                callback();
        };

        this.stat = function(path, callback) {
	    //console.log('stat',path);
            var dirObj = {
                isDirectory: function() {
                    return true
                },
                mode: 16893,
                size: 4096,
                mtime: new Date()
            };
            if (callback)
                callback(null, dirObj);
        };

        this.createWriteStream = function(path, options) {
            return fs.createWriteStream(path, options);
        };
        this.createReadStream = function(path) { //FTP download
            return fs.createReadStream(path);
        };

        this.writeFile = function(path, data, enc, callback) {

            var _path = path.split('/');
            var file = _path.pop();
            _path = _path.join('/');
            dirs[_path] = dirs[_path] || {};
            dirs[_path][file] = data.length;

	    //console.log(_path,file);
	    /*
	    _path = _path.split('/');
	    file = _path.pop();
	    _path = _path.join('/')+'/';
            dirs[_path] = dirs[_path] || {};
            dirs[_path][file] = '4096';
            */
	    //console.log(_path,file);



            if (path.substr(-4) == '.jpg') {
                if (data.length < minFullImageSize)
                    images.crop = data;
                else
                    images.full = data;

                //console.log('writeFile', path, data.length);

                if (images.crop /*&& images.full*/) {
                    faceDetect(images.crop, conn.socket.remoteAddress.replace('::ffff:',''));
                    //var _time = new Date().getTime();
                    //fs.writeFile('data/' + _time + '.full.jpg', images.full, function() {});
                    //fs.writeFile('data/' + _time + '.crop.jpg', images.crop, function() {});
                    images = {};
                }

            	delete dirs[_path][file];
		delete dirs[_path];
		//console.log(dirs)
            };

            if (callback)
                callback();
        };

    }
    //ftpServer.debugging = 4;
    ftpServer.listen(options.port);
    console.log('FTP listening on port ' + options.port);
}