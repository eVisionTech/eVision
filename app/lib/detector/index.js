const request = require('request');
const Rtsp2 = require('../rtsp2');

function start() {
    let params = this.params;
    let onFrameData = this.onFrameData;
    let onError = this.onError;

    if (!params.device.uri)
        return console.log('Param "deviceUri" not found');

    function rtspRestart() {

        if (!params.active) return;

        let conf = {
            input: params.device.uri,
            resize: params.resize,
            crop: params.crop,
            device_type: params.device.type
        };

        if (params.video.crop) conf.crop = params.video.crop;
        if (params.video.framerate) conf.rate = params.video.framerate;
        if (params.video.resize) conf.resize = params.video.resize;

        this.rtsp = new Rtsp2.FFMpeg(conf);
        this.rtsp.on('data', onFrameData);
        this.rtsp.on('error', onError);
    }

    function nextJpeg() {
        let _time = (1000 / (params.video.framerate || 5)) - (new Date().getTime() - lastFrameTime);
        if (_time < 0) _time = 0;
        setTimeout(mJpegRestart.bind(this), _time);
    }

    function mJpegRestart() {
        let that = this;
        if (params.device.uri == 'webcam') return setTimeout(mJpegRestart.bind(that), 5000);
        lastFrameTime = new Date().getTime();

        let auth = params.device.uri.match(/^(.+?\/\/)(.+?):(.+?)@(.+)$/);

        request({
            url: params.device.uri,
            auth: {
              user: auth && auth[2] || '',
              pass: auth && auth[3] || '',
              sendImmediately: false
            },
            encoding: null
        }, function (err, res, body) {
            if (err) {
                console.error(err)
                return setTimeout(mJpegRestart.bind(that), 5000);
            }
            onFrameData(body);
            if (params.active && !that.stopped)
                nextJpeg.bind(that)();
        });
    }

    if (/^ws/.test(params.device.uri)) return;
    if (/^http/.test(params.device.uri) && params.device.type != 'TRASSIR_Cloud')
        mJpegRestart.bind(this)();
    else
        rtspRestart.bind(this)();
}

function stop(restart) {
    this.params.active = restart || false;
    if (this.rtsp)
        this.rtsp.stop();  
    this.onStop();
    this.stopped = true;
}

function onStop() { }
function onFrameData() { }
function onError() { }

function Detector(params) {
    this.params = params;
    this.rtsp = null;
    this.start = start;
    this.stop = stop;
    this.onStop = onStop;
    this.onFrameData = onFrameData;
    this.onError = onError;
}

module.exports = Detector;
