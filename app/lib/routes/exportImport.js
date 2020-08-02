const path = require('path');
const archiver = require('archiver');
const extract = require('extract-zip')
const enfsensure = require("enfsensure");
const fs = require('fs-extra');
const multer = require('multer');
const exec = require('child_process').exec;

var data_path = process.env.data_path || 'data';

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, data_path)
    }
});
var upload = multer({ storage: storage });

const Settings = require('../db/models/settings');
const Device = require('../db/models/device');
const User = require('../db/models/user');

function exportCollection(app, res, collections, folders) {
  let archive = archiver('zip');
  let file_path = path.resolve(data_path, `evision_${collections[0]}_export.zip`);
  let output = fs.createWriteStream(file_path);
  archive.pipe(output);

  let mongoexport = '';
  if (process.platform === 'linux') mongoexport = 'mongoexport';
  else mongoexport = path.resolve(__dirname, './../../../db/mongoexport.exe')

  let queries = collections.map(collection => {
    return new Promise((resolve, reject) => {
      mongoexport = [
        `${mongoexport}`,
        `--host=${app.mongo_auth.hostname}`,
        `--port=${app.mongo_auth.port}`,
        `--db=${app.mongo_auth.db}`,
        `--collection=${collection}`
      ].join(' ');
  
      exec(mongoexport,  { maxBuffer: 1024 * 1024 * 100 }, (err, stdout, stderr) => {
        if (err) return reject(err);
        if (stderr) console.log(stderr);
             
        archive.append(stdout, { name: `${collection}.json` });

        return resolve();
      });
    });
  });

  Promise.all(queries)
    .then(() => {
      if (folders) {
        folders.forEach(folder => {
          archive.directory(path.resolve(data_path, folder), folder);
        });
      }
    })
    .then(() => {
      archive.finalize();    
    })
    .catch((err) => {
      console.error(err)
      return res.status(400).send({ success: false, msg: 'bad_export' });
    });

  output.on('close', () => {
    res.download(file_path, (e) => {
      if (e) console.error(e);
      fs.remove(file_path)
        .catch(err => {
          console.error(err);
        });
    });
  });
}

function importCollection(app, req, res, collections) {
  let mongoimport = '';
  if (process.platform === 'linux') mongoimport = 'mongoimport';
  else mongoimport = path.resolve(__dirname, './../../../db/mongoimport.exe')

  let fn = function fn(collection) {
    return new Promise((resolve, reject) => {
      let file_path = path.resolve(data_path, 'temp', `${collection}.json`)
      mongoimport = [
        `${mongoimport}`,
        `--host=${app.mongo_auth.hostname}`,
        `--port=${app.mongo_auth.port}`,
        `--db=${app.mongo_auth.db}`,
        `--collection=${collection}`,
        `--file="${file_path}"`,
        `--mode=upsert`,
        `--drop`
      ].join(' ');
  
      exec(mongoimport, (err, stdout, stderr) => {
        if (err) return reject(err);
        if (stderr) console.log(stderr);
        if (stdout) console.log(stdout);    
        return resolve();
      });
    });
  };

  enfsensure.ensureDir(path.resolve(data_path, 'temp'), (err, temp) => {
    if (err) console.error(err);
    extract(path.resolve(data_path, req.file.filename), { dir: temp }, (err) => {
      if (err) {
        console.error(err);
        return fs.remove(temp)
          .then(() => {
            return res.status(400).send({ success: false, msg: 'bad_arch' });
          })
          .catch(() => {
            return res.status(400).send({ success: false, msg: 'bad_arch' });
          });
      }

      fs.remove(path.resolve(data_path, req.file.filename))        
        .then(
          () => { return checkFiles(temp, collections) }, (e) => { return Promise.reject(e) }
        )
        .then(
          () =>  { return Promise.all(collections.map(fn)) }, (e) => { return Promise.reject(e) }
        )
        .then(() =>  {
          collections.forEach(collection => {
            let file_path = path.resolve(temp, `${collection}.json`)
            fs.unlink(file_path, (err) => {
              if (err) console.error(err);
            })
          })
          return res.status(200).json({ success: true });
        }, (e) => { return Promise.reject(e) })
        .catch((e) => {
          console.error(e)
          fs.remove(temp)
          .then(() => {
            return res.status(400).send({ success: false, msg: 'wrong_files' });
          })
          .catch(() => {
            return res.status(400).send({ success: false, msg: 'wrong_files' });
          });
        });
    });
  });
}

function checkFiles(temp, collections) {
  let promises = collections.map(collection => {
    return new Promise((resolve, reject) => {
      let file_path = path.resolve(temp, `${collection}.json`)
      fs.stat(file_path, (err, stats) => {
        if (err) reject(err);
        if (!stats) reject();
        else resolve();
      });
    });
  });
  return Promise.all(promises);
}

module.exports = function (app) {
  app.post('/api/v1/Export/:exportType', (req, res) => {
    if (req.xhr && req.params.exportType) {
      switch (req.params.exportType) {
        case 'Settings':
          exportCollection(app, res, [Settings.collection.collectionName]);
          break;
        case 'Device':
          exportCollection(app, res, [Device.collection.collectionName]);
          break;
        case 'User':
          exportCollection(app, res, [User.collection.collectionName]);
          break;  
        default: 
          res.status(400).send({ success: false, msg: 'wrong_export_type' });
          break;
      }
    } else {
      return res.redirect('/');
    }
  });  

  app.post('/api/v1/Import/:importType', upload.single('Import'), (req, res) => {
    console.log(req.params, req.file)
    if (req.xhr && req.params.importType) {
      switch (req.params.importType) {
        case 'Settings':
          importCollection(app, req, res, [Settings.collection.collectionName]);
          break;
        case 'Device':
          importCollection(app, req, res, [Device.collection.collectionName]);
          break;
        case 'User':
          importCollection(app, req, res, [User.collection.collectionName]);
          break;  
        default: 
          res.status(400).send({ success: false, msg: 'wrong_import_type' });
          break;
      }
    } else {
      return res.redirect('/');
    }
  });
}
