const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const enfsensure = require('enfsensure');
const ffmpeg = require('fluent-ffmpeg');

if (/^win/.test(process.platform)) {
  ffmpeg.setFfmpegPath(path.resolve(__dirname + '/../../../bin/ffmpeg'));
  ffmpeg.setFfprobePath(path.resolve(__dirname + '/../../../bin/ffprobe'));
}

let data_path = process.env.data_path || path.join(__dirname + '../../../data');

const Video = require('../db/models/video');

module.exports = {
  init: function (app, conf) {
    if (!app.watchers) app.watchers = [];

    let pathCh = path.resolve(data_path, 'videos', conf.id, 'temp');
    enfsensure.ensureDir(pathCh, (err) => {
      if (err) console.log(err);
      app.watchers[conf.id] = chokidar.watch(pathCh, { ignoreInitial: true }).on('add', function (_path, stats) {
        if (this.previousVideoFile) {
          if (conf.motionDetection.enable && (!this.detectionDate || this.detectionDate < this.previousVideoFile.stats.birthtime)) {
            fs.unlink(this.previousVideoFile.path, (err) => {
              if (err) console.error(err);
              console.log('removed videofile:', this.previousVideoFile.path);
              this.previousVideoFile = {
                path: _path,
                stats: stats
              }
            });
          } else {
            let dstpath = path.resolve(data_path, 'videos', conf.id, path.basename(this.previousVideoFile.path));
            fs.move(this.previousVideoFile.path, dstpath, { overwrite: true }, (err) => {
              if (err) console.error(err);
              console.log('added videofile:', dstpath);
              ffmpeg.ffprobe(dstpath, (err, metadata) => {
                let start = new Date(this.previousVideoFile.stats.birthtime);
                let end = new Date(new Date(this.previousVideoFile.stats.birthtime).getTime() + metadata.format.duration * 1000);
                let newVideo =  new Video({
                  sourceId: conf.id,
                  filename: path.basename(dstpath),
                  start: start.getTime(),
                  end: end.getTime(),
                  duration: metadata.format.duration * 1000
                });
                newVideo.save(err => {
                  if (err) console.error(err);
                })
                this.previousVideoFile = {
                  path: _path,
                  stats: stats
                }
              });
            });
          }
        } else {
          this.previousVideoFile = {
            path: _path,
            stats: stats
          }
        }
      });
    });

    function cleanTemp() {
      fs.readdir(pathCh, (err, files) => {
        if (files && files.length > 0)
          files.forEach(file => {
            let p = path.resolve(pathCh, file);
            fs.stat(p, (err, stats) => {
              if (err) console.log(err);      
              let start = new Date(stats.birthtime).getTime();
              let now = new Date().getTime();
              if ((now - start) > 1000 * 60 * 60) {
                fs.unlink(p, (err) => {
                  if (err) console.error(err);              
                });
              }
            });
          });
      });
    }

    cleanTemp();
    setInterval(cleanTemp, 1000 * 60 * 60);
  },

  startVideoRecorder: function (nodeConf, processes) {
    let name = 'video_' + nodeConf.id;
    let cwd = path.resolve(data_path, 'videos', nodeConf.id, 'temp');

    function createFFMpegProc(url) {
      return ffmpeg(url)
              .videoCodec('copy')
              .audioCodec('aac')
              .outputOptions(
                '-f', 'segment',
                '-segment_time', nodeConf.motionDetection.enable ? '60' : '600',
                '-segment_format', 'mp4',
                '-strict', '-2',
                '-reset_timestamps', '1',
                '-strftime', '1'              
              )
              .on('start', (cmd) => {              
                console.log(name, 'started:', cmd);
              })
              .on('error', (err) => {
                if (err) console.error(err.message);
                if (processes[name] && !processes[name].__end) module.exports.startVideoRecorder(nodeConf);
                delete processes[name];
              })
              .on('end', (a) => {
                if (processes[name] && !processes[name].__end) module.exports.startVideoRecorder(nodeConf);
                delete processes[name];
              })
              .save(path.resolve(cwd, '%Y%m%d-%H%M%S.mp4'));
    }

    enfsensure.ensureDir(cwd, (err, pth) => {
      if (err) return console.error(err);
      if (nodeConf.device.type == 'TRASSIR_Cloud') {
        const TRASSIR_Cloud = require('../rtsp2/trassir_cloud');
        TRASSIR_Cloud.get_video(nodeConf.videoRecording.uri, (err, new_url) => {
          if (err) return console.error(err);
          if (!new_url && !processes[name]) {
            return setTimeout(function() {
              module.exports.startVideoRecorder(nodeConf);
            }, 5000);
          } else {
            processes[name] = createFFMpegProc(new_url)
          }
        });
      } else {
        processes[name] = createFFMpegProc(nodeConf.videoRecording.uri)
      }
    });
  },

  deleteVideoRecorder: function (id, processes, cb) {
    let name = 'video_' + id;
    console.log(name, 'stopped');
    processes[name].__end = true;
    setTimeout(() => {
      processes[name].ffmpegProc.stdin.write('q');
      delete processes[name];
      if (cb) cb();
    }, 2500);
  }
}
