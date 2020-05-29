const mjpegServer = require('mjpeg-server');
const motionDetection = require('../motionDetection');
const videoArchive = require('../videoArchive');
const streamer = require('../stream');
const Jimp = require('jimp');
const Canvas =  require("./../canvas");
const Image = Canvas.Image;

const previewFps = 5;
const previewWidth = 640;
const previewHeight = 480;

module.exports = function (app, conf, detectors) {

    var streams = {},
        sources = { Preview: {} },
        frames = {}

    detectors.onStart = function onStart(detector) {
        let id = detector.params && detector.params.id;
      
        sources[id] = detector;

        detector.ready = true;
        detector.motionDetection = {};
        detector.motionDetection.ready = true;

        detector.onStop = function onStop() {
            console.log('stop detector "' + id + '"');
            delete sources[id];
            delete frames[id];
        };

        let nodeConf = detector.params;
        let onStreamData = streamer(nodeConf, app, conf);

        detector.onFrameData = function onFrameData(data, cb) {
            let _data = data;
            if (typeof data == 'string')
                _data = new Buffer(data, 'base64');
            else
                data = new Buffer(data).toString('base64')
            frameObj = { image: _data, nodeConf: nodeConf, cb: cb };            

            onFrameComplete({}, frameObj);
        }

        detector.onError = function onError(err) {
            console.warn('No Frame: ' + id + ' ' + err);
            let image = new Jimp(1280, 720, 'black', (err, image) => {
                if (err) throw err
            });
            Jimp.loadFont(Jimp.FONT_SANS_16_WHITE)
                .then(font => {
                    image.print(font, 10, 10, 'Unable to connect to the video source!');
                    image.print(font, 10, 30, err);
                    return image
                })
                .then(_image => {
                    _image.getBuffer(Jimp.MIME_JPEG, (err, data) => {
                        let frameObj = { image: data, nodeConf: nodeConf };
                        onFrameComplete({}, frameObj);
                    });
                })

            detector.motionDetection.ready = false;
            setTimeout(function () {
                detector.motionDetection.ready = true;
            }, 1000)
        }

        if (nodeConf.videoRecording.enable) {
            videoArchive.init(app, nodeConf);
        }

        function onFrameComplete(data, ctx) {
            if (ctx) {
                let nodeConf = ctx.nodeConf;

                if (nodeConf.motionDetection.enable && detector.motionDetection.ready) {
                    if (!detector.motionDetection.prev)
                        detector.motionDetection.prev = ctx.image;
                    detector.motionDetection.curr = ctx.image;

                    motionDetection(detector.motionDetection, nodeConf)
                        .then((movement) => {
                            detector.motionDetection.prev = ctx.image;
                            if (movement) {
                                app.wss.broadcast('movement|' + nodeConf.id, {
                                    binary: false
                                });
                                if (nodeConf.notif.enable && nodeConf.notif.motionDetection.enable) {
                                    if (nodeConf.notif.motionDetection.notifMode == 'phrase' && nodeConf.notif.motionDetection.phrase) {
                                        let nodeIndex = 1;
                                        conf.nodes.forEach(function(item, i){
                                              if (item.id == nodeConf.id)
                                              nodeIndex = i + 1 
                                         });

                                        let phrase = nodeConf.notif.motionDetection.phrase;
                                        phrase = phrase.replace(/{deviceName}/g, nodeConf.device.name);
                                        phrase = phrase.replace(/{deviceNum}/g, nodeIndex);
                                        
                                        app.wss.broadcast('actionNotif|' + phrase.trim(), {
                                            binary: false
                                        });
                                    } else if (nodeConf.notif.motionDetection.notifMode == 'file') {
                                        app.wss.broadcast('actionNotif|motion.mp3' , {
                                            binary: false
                                        });
                                    }
                                }
                                if (app.watchers && app.watchers[nodeConf.id])
                                    app.watchers[nodeConf.id].detectionDate = new Date();
                                detector.motionDetection.ready = false;
                                setTimeout(function () {
                                    detector.motionDetection.ready = true;
                                }, 3500)
                            }
                        })
                        .catch((err) => {
                            if (err) console.error(err)
                        });
                }

                return writeFrame(ctx.image)
            } else detector.ready = true;

            function writeFrame(data) {
                detector.ready = true;
                onStreamData(data);
                if ((Object.keys(streams['Preview'] || {})).length)
                    loadImage(data, id);
                if (streams[id])
                    Object.keys(streams[id]).forEach(function (_id) {
                        if (streams[id][_id] && streams[id][_id].writable)
                            streams[id][_id].write(data)
                    });
            }
        }

    };

    function loadImage(buff, id) {
        const img = new Image();
        img.onload = function () {
            frames[id] = img
        }
        img.src = buff
    }

    function preview() {
        var _frames = [];
        for (let node of conf.nodes)
            if (node.id in frames) _frames.push(frames[node.id])

        let width = previewWidth;
        let height = previewHeight;

        var canvas = Canvas.createCanvas(width, height)
        var context = canvas.getContext('2d')

        context.imageSmoothingEnabled = true;

        try {
            let _length = _frames.length;

            if (_length > 0 && _length <= 2) {
                context.drawImage(_frames[0], 0, 0, width / 2, height);
                if (_frames[1])
                    context.drawImage(_frames[1], width / 2, 0, width / 2, height);
            }

            if (_length > 2 && _length <= 4) {
                context.drawImage(_frames[0], 0, 0, width / 2, height / 2);
                if (_frames[1])
                    context.drawImage(_frames[1], width / 2, 0, width / 2, height / 2);
                if (_frames[2])
                    context.drawImage(_frames[2], 0, height / 2, width / 2, height / 2);
                if (_frames[3])
                    context.drawImage(_frames[3], width / 2, height / 2, width / 2, height / 2);
            }

            if (_length > 4 && _length <= 9) {
                context.drawImage(_frames[0], 0, 0, width / 3, height / 3);
                if (_frames[1])
                    context.drawImage(_frames[1], width / 3, 0, width / 3, height / 3);
                if (_frames[2])
                    context.drawImage(_frames[2], width * 2 / 3, 0, width / 3, height / 3);

                if (_frames[3])
                    context.drawImage(_frames[3], 0, height / 3, width / 3, height / 3);
                if (_frames[4])
                    context.drawImage(_frames[4], width / 3, height / 3, width / 3, height / 3);
                if (_frames[5])
                    context.drawImage(_frames[5], width * 2 / 3, height / 3, width / 3, height / 3);

                if (_frames[6])
                    context.drawImage(_frames[6], 0, height * 2 / 3, width / 3, height / 3);
                if (_frames[7])
                    context.drawImage(_frames[7], width / 3, height * 2 / 3, width / 3, height / 3);
                if (_frames[8])
                    context.drawImage(_frames[8], width * 2 / 3, height * 2 / 3, width / 3, height / 3);

            }

            if (_length > 9 && _length <= 16) {
                context.drawImage(_frames[0], 0, 0, width / 4, height / 4);
                if (_frames[1])
                    context.drawImage(_frames[1], width / 4, 0, width / 4, height / 4);
                if (_frames[2])
                    context.drawImage(_frames[2], width * 2 / 4, 0, width / 4, height / 4);
                if (_frames[3])
                    context.drawImage(_frames[3], width * 3 / 4, 0, width / 4, height / 4);

                if (_frames[4])
                    context.drawImage(_frames[4], 0, height / 4, width / 4, height / 4);
                if (_frames[5])
                    context.drawImage(_frames[5], width / 4, height / 4, width / 4, height / 4);
                if (_frames[6])
                    context.drawImage(_frames[6], width * 2 / 4, height / 4, width / 4, height / 4);
                if (_frames[7])
                    context.drawImage(_frames[7], width * 3 / 4, height / 4, width / 4, height / 4);

                if (_frames[8])
                    context.drawImage(_frames[8], 0, height * 2 / 4, width / 4, height / 4);
                if (_frames[9])
                    context.drawImage(_frames[9], width / 4, height * 2 / 4, width / 4, height / 4);
                if (_frames[10])
                    context.drawImage(_frames[10], width * 2 / 4, height * 2 / 4, width / 4, height / 4);
                if (_frames[11])
                    context.drawImage(_frames[11], width * 3 / 4, height * 2 / 4, width / 4, height / 4);

                if (_frames[12])
                    context.drawImage(_frames[12], 0, height * 3 / 4, width / 4, height / 4);
                if (_frames[13])
                    context.drawImage(_frames[13], width / 4, height * 3 / 4, width / 4, height / 4);
                if (_frames[14])
                    context.drawImage(_frames[14], width * 2 / 4, height * 3 / 4, width / 4, height / 4);
                if (_frames[15])
                    context.drawImage(_frames[15], width * 3 / 4, height * 3 / 4, width / 4, height / 4);
            }

        } catch (e) { console.log(e) }
        return canvas.toBuffer();
    }

    setInterval(function () {
        (Object.keys(streams['Preview'] || {})).forEach(function (_id) {
            let data = preview();
            if (streams['Preview'][_id] && streams['Preview'][_id].writable)
                streams['Preview'][_id].write(data);
        });
    }, 1000 / previewFps);

    app.get('/api/v1/Stream/:id', function (req, res) {
        var id = req.params && req.params.id;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        ip = ip.split(',')[0];

        var _id = Math.random().toString(26).slice(2);

        console.log('/api/v1/Stream', ip, id, _id, !!sources[id]);

        if (!id) return res.send('Url parametr "id" not found!');
        if (!sources[id]) return res.send(`Source id "${id}" not found!`);

        var stream = mjpegServer.createReqHandler(req, res);

        streams[id] = streams[id] || {};
        streams[id][_id] = stream;

        req.on('close', function () {
            console.log('close stream', ip, id, _id);
            stream.writable = false;
            stream.close();
            delete streams[id][_id];
        })
    });

    console.log('MEDIA  controller stared');
}
