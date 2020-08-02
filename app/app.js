process.on('uncaughtException', (e) => {
    console.error('uncaughtException', e);
});

require('log-timestamp');

const path = require('path');

const IS_WIN = /^win/.test(process.platform);

process.chdir(__dirname);

process.env.data_path = process.env.data_path || path.resolve(__dirname, 'data');
if (IS_WIN)
  process.env.data_path = path.resolve(process.env.APPDATA, 'eVision Data');

var data_path = process.env.data_path;

const express = require('express'),
  enfsensure = require('enfsensure'),
  pm2 = require('pm2'),
  http = require('http'),
  app = express(),
  detector = require('./lib/detector'),
  mongoDB = require('./lib/db'),
  videoArchive = require('./lib/videoArchive');
  server = http.createServer(app);
  si = require('systeminformation');
  execSync = require('child_process').execSync,  
  fs = require('fs-extra'),
  os = require('os'),
  uuid = require('uuid/v4');

app.set('port', process.env.WEB_PORT || 4000);

app.mongo_auth = {
  db: process.env.MONGO_INITDB_DATABASE || 'evision',
  hostname: process.env.MONGO_HOSTNAME || 'localhost',
  port: process.env.MONGO_PORT || '27017',
}

var processes = {};
var detectors = { nodes: {}, onStart: function () { } };
var _ifaces = [];

var conf = {};
var packFile = './package.json';

if (IS_WIN)
  packFile = path.resolve(__dirname, '../package.json');

function initCreate() {
  let promises = [];

  promises.push(
    new Promise((resolve, reject) => {
      function moveFiles(files) {
        if (files.length) {
          let file = files.shift();
          fs.move(path.resolve(data_path, 'temp', file), path.resolve(data_path, file), { overwrite : true }, (err) => {
            if (err) return reject(err);
            moveFiles(files);
          });
        }
        else {
          fs.rmdir(path.resolve(data_path, 'temp'), (err) => {
            if (err) reject(err);
            resolve();
          });
        }
      }

      if (fs.existsSync(path.resolve(data_path, 'temp'))) {
        fs.readdir(path.resolve(data_path, 'temp'), (err, files) => {
          if (err) return reject(err);
          moveFiles(files);
        });
      } else resolve();
    })
  );

  promises.push(
    new Promise((resolve, reject) => {
      let audioFiles = ['motion.mp3', 'motionP.mp3'];
      audioFiles = audioFiles.filter(file => {
        if (fs.existsSync(path.resolve(data_path, 'media', file))) {
          return false;
        } else return file;
      });
      
      audioFiles.forEach(file => {
        let pth = path.resolve(data_path, '..', 'media', file)
        if (IS_WIN)
          pth =  path.resolve(__dirname, 'media', file)
        fs.copy(pth, path.resolve(data_path, 'media', file), { overwrite : true }, (err) => {
          if (err) return reject(err);
        });
      });
      resolve();
    })
  );

  promises.push(
    new Promise((resolve) => {
      const ifaces = os.networkInterfaces();
      Object.keys(ifaces).forEach((ifname) => {
        ifaces[ifname].forEach((iface) => {
          if (iface.family === 'IPv4' && iface.address !== '127.0.0.1' && !iface.internal) {
            let obj = { name: ifname + ': ' + iface.address, address: iface.address };
            if (_ifaces.findIndex((e) => e.address === iface.address) === -1)
              _ifaces.push(obj);
          }
        });
      });
      resolve();
    })
  );
  
  return Promise.all(promises).catch((err) => {
    console.error(err);
  });
}

function saveConf() {
  const Settings = require('./lib/db/models/settings');
  const { nodes, ...newObject } = conf;
  Settings.findOneAndUpdate({ '_id': conf._id }, newObject, { upsert: true }, (err, doc) => {
    if (err) console.error(err);
  });
};

function deleteProcess(name, cb) {
  pm2.connect((err) => {
    if (err) return console.error(err);
    pm2.delete(name, (err) => {
      if (err) return console.error(err);
      console.log('process deleted', name);
      delete processes[name];
      if (cb) cb();
    });
  });
}

function deleteNode(id, cb) {
  let nodeConf = conf && conf.nodes && conf.nodes.filter((item) => { return (item.id == id) })[0]

  if (detectors && detectors.nodes && detectors.nodes[id]) {
    detectors.nodes[id].stop();
    detectors.nodes[id] = null;
    delete detectors.nodes[id];
  }

  if (app.watchers && app.watchers[id]) app.watchers[id].close();

  if (nodeConf.videoRecording.enable)  videoArchive.deleteVideoRecorder(nodeConf.id, processes);

  if (cb) cb();
}

function restartNode(params, cb) {
  let oldNodeConf = conf && conf.nodes && conf.nodes.filter((item) => { return (item.id == params.id) })[0];

  conf.nodes = conf.nodes.map(node => {
    if (node.id == params.id)
      return Object.assign({}, node, params)
    return node;
  });

  let nodeConf = conf && conf.nodes && conf.nodes.filter((item) => { return (item.id == params.id) })[0];

  let _detector = detectors.nodes[nodeConf.id];
  if (_detector) _detector.stop(true);

  if (app.watchers && app.watchers[nodeConf.id]) app.watchers[nodeConf.id].close();

  if (oldNodeConf.videoRecording.enable && !nodeConf.videoRecording.enable) videoArchive.deleteVideoRecorder(nodeConf.id, processes);

  if (!nodeConf.active) {
    console.log('detector "' + nodeConf.id + '" inactive');
    if (cb) cb({ success: true });
    return;
  }

  _detector = new detector(nodeConf);
  detectors.nodes[nodeConf.id] = _detector;
  detectors.onStart(_detector);
  _detector.start();

  if (!oldNodeConf.videoRecording.enable && nodeConf.videoRecording.enable) {
    videoArchive.startVideoRecorder(nodeConf, processes);
  } else if (nodeConf.videoRecording.enable && oldNodeConf.videoRecording.uri != nodeConf.videoRecording.uri) {
    videoArchive.deleteVideoRecorder(nodeConf.id, processes, () => {
      videoArchive.startVideoRecorder(nodeConf, processes);
    });    
  } else if (nodeConf.videoRecording.enable && oldNodeConf.motionDetection.enable != nodeConf.motionDetection.enable) {
    videoArchive.deleteVideoRecorder(nodeConf.id, processes, () => {
      videoArchive.startVideoRecorder(nodeConf, processes);
    });
  }

  require('./lib/stream');

  if (cb) cb({ success: true });
}

function stopNode(id, cb) {
  deleteNode(id, onStop);
  function onStop() {
    conf.nodes = conf.nodes.filter((item) => {
      return item.id != id
    });
    cb({ success: true });
  }
};

process.on('SIGINT', exitHandler);
process.on('exit', exitHandler);

if (IS_WIN) {
  process.on('message', (msg) => {
    if (msg.action === 'STOP') exitHandler();
  });
}

function exitHandler(code) {
  console.log('exitHandler code', code);
    if (IS_WIN && process.send) {
      process.send({ theme: conf.theme });
    }
  if (code == 0) return;
  try {
    function toDo() {
      let names = Object.keys(processes);
      if (names.length) {
        if (names[0].includes('video'))
          videoArchive.deleteVideoRecorder(names[0].split('_')[1], processes, toDo);
        else 
        deleteProcess(names[0], toDo);
      }        
      else if (IS_WIN) {
        pm2.killDaemon((err) => {
          if (err) return console.error(err);
          setTimeout(function () { process.exit(0) }, 100);
        })
      } else {
        setTimeout(function () { process.exit(0) }, 100);
      }
    }
    mongoDB.disconnect(toDo);    
  } catch (e) {
    console.error(e)
  }
};

function init() {
  server.listen(app.get('port'), () => {
    console.log('HTTP server listening on port ' + app.get('port'));
    if (IS_WIN && process.send) {
      process.send({ start: true });
      process.send({ lang: conf.lang });
      process.send({ theme: conf.theme });
    }    
  });

  app.wss = require('./lib/routes/webSocket')(server);
  console.log('1')

  require('./lib/routes/auth')(app, conf); console.log('2');
  require('./lib/routes/store')(app, conf); console.log('3');
  require('./lib/routes/control')(app, startNextNode, stopNode, restartNode); console.log('4'); 
  require('./lib/routes/sysStats')(app); console.log('5');
  require('./lib/routes/relay')(app, conf); console.log('6');
  require('./lib/routes/exportImport')(app); console.log('7');
  require('./lib/routes/scan')(app); console.log('8');
  require('./lib/rotateData')(app, conf); console.log('9');
  require('./lib/nat')(app, conf, saveConf); console.log('10');
  require('./lib/upnpServer')(app, conf);  console.log('11');

  require('./lib/routes/media')(app, conf, detectors); console.log('12');

  require('./lib/routes/settings')(app, conf, saveConf); console.log('13');

  mongoDB.restify(app);
}

function startNextNode(params, cb) {
  function onStart() { cb({ success: true, id: params.id }) };
  conf.nodes.push(params);
  startNode(params.id, onStart);
}

function startNode(id, cb) {
  let nodeConf = conf && conf.nodes.filter((item) => { return (item.id == id) })[0]
  if (!nodeConf.active) {
    console.log('detector "' + nodeConf.id + '" inactive');
    if (cb) cb({ success: true });
    return;
  }

  let _detector = new detector(nodeConf);
  detectors.nodes[id] = _detector;

  detectors.onStart(_detector);
  _detector.start();
  if (cb) cb({ success: true });

  if (nodeConf.videoRecording.enable)
    videoArchive.startVideoRecorder(nodeConf, processes);
}
  
function onDBConnect() {
  initCreate().then(async () => {
    try {
      const Settings = require('./lib/db/models/settings');
      conf = (await Settings.find({}, null, { lean: true }))[0];
      if (!conf) {
        let newSettings = new Settings({});
        await newSettings.save();
        conf = (await Settings.find({}, null, { lean: true }))[0];
      }
    } catch(e) {
      console.error(e);
    }

    fs.readFile(packFile, (err, data) => {
      if (err) console.error(err);
      let a = data.toString().trim();
      conf.version = JSON.parse(a).version;
    });

    conf.nodes = [];
    conf.platform = process.platform;
    conf.ifaces = _ifaces;

    try {
      const Device = require('./lib/db/models/device');
      conf.nodes = await Device.find({}, null, { lean: true });
    } catch (e) {     
      console.error(e);
    } 

    let ids = conf.nodes.map(node => node.id);

    app.cache.videos = [];

    const Video = require('./lib/db/models/video');

    syncVideos();
    setInterval(syncVideos, 60000)

    init();

    function toDo() {
      if (ids.length)
        startNode(ids.shift(), toDo);
    }

    function syncVideos() {
      Video.find({}, null, { lean: true }, (err, videos) => {
        if (err) console.error(err)
        app.cache.videos = videos;
      });
    }

    pm2.connect(toDo);   
  });
}

mongoDB.init(app, onDBConnect)
