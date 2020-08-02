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

var icon_record;

Canvas.loadImage('./portal/images/icon_record.png').then((image) => {
    icon_record = image;
});

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
                                    if (nodeConf.notif.motionDetection.notifMode == 'phrase') {
                                        app.wss.broadcast('actionNotif|motionP.mp3' , {
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
        var _nodes = [];
        for (let node of conf.nodes)
            if (node.id in frames) {
                _nodes.push({
                    id: node.id, 
                    frames: frames[node.id], 
                    name: node.device.name.length > 10 ? node.device.name.substring(0,10) + '...' : node.device.name,
                    videoRecording: node.videoRecording.enable
                })
            }

        let width = previewWidth;
        let height = previewHeight;

        var canvas = Canvas.createCanvas(width, height)
        var context = canvas.getContext('2d')

        context.imageSmoothingEnabled = true;
        context.strokeStyle = '#fff';
        context.lineWidth = 1;
        context.fillStyle = '#000';
        context.fillRect(0, 0, width, height);
        context.fillStyle = '#fff';
        context.font = '12px Georgia';

        try {
            let _length = _nodes.length;

            if (_length > 0 && _length <= 2) {
                if (_nodes[0]) {
                    console.log(_nodes[0])
                    context.drawImage(_nodes[0].frames, 0, 0, width / 2, height);
                    context.fillText(_nodes[0].name, 5, 15);
                    if (_nodes[0].videoRecording) context.drawImage(icon_record, width / 2 - 25, 32, 15, 15);
                }

                context.strokeRect(0, 0, width / 2, height);

                if (_nodes[1]) {
                    context.drawImage(_nodes[1].frames, width / 2, 0, width / 2, height);
                    context.fillText(_nodes[1].name, width / 2 + 5, 15);
                    if (_nodes[1].videoRecording) context.drawImage(icon_record, width - 25, 32, 15, 15);
                }

                context.strokeRect(width / 2, 0, width / 2, height);
            }

            if (_length > 2 && _length <= 4) {
                if (_nodes[0]) {
                    context.drawImage(_nodes[0].frames, 0, 0, width / 2, height / 2);
                    context.fillText(_nodes[0].name, 5, 15);
                    if (_nodes[0].videoRecording) context.drawImage(icon_record, width / 2 - 25, 32, 15, 15);
                }

                context.strokeRect(0, 0, width / 2, height / 2);

                if (_nodes[1]) {
                    context.drawImage(_nodes[1].frames, width / 2, 0, width / 2, height / 2);
                    context.fillText(_nodes[1].name, width / 2 + 5, 15);
                    if (_nodes[1].videoRecording) context.drawImage(icon_record, width - 25, 32, 15, 15);
                }

                context.strokeRect(width / 2, 0, width / 2, height / 2);

                if (_nodes[2]) {
                    context.drawImage(_nodes[2].frames, 0, height / 2, width / 2, height / 2);
                    context.fillText(_nodes[2].name, 5, height / 2 + 15);
                    if (_nodes[2].videoRecording) context.drawImage(icon_record, width / 2 - 25, height / 2 + 32, 15, 15);
                }

                context.strokeRect(0, height / 2, width / 2, height / 2);

                if (_nodes[3]) {
                    context.drawImage(_nodes[3].frames, width / 2, height / 2, width / 2, height / 2);
                    context.fillText(_nodes[3].name, width / 2 + 5, height / 2 + 15);
                    if (_nodes[3].videoRecording) context.drawImage(icon_record, width - 25, height / 2 + 32, 15, 15);
                }

                context.strokeRect(width / 2, height / 2, width / 2, height / 2);

            }

            if (_length > 4 && _length <= 9) {
                if (_nodes[0]) {
                    context.drawImage(_nodes[0].frames,  0, 0, width / 3, height / 3);
                    context.fillText(_nodes[0].name, 5, 15);
                    if (_nodes[0].videoRecording) context.drawImage(icon_record, width / 3 - 25, 32, 15, 15);
                }

                context.strokeRect(0, 0, width / 3, height / 3);

                if (_nodes[1]) {
                    context.drawImage(_nodes[1].frames, width / 3, 0, width / 3, height / 3);
                    context.fillText(_nodes[1].name, width / 3 + 5, 15);
                    if (_nodes[1].videoRecording) context.drawImage(icon_record, width * 2 / 3 - 25, 32, 15, 15);
                }

                context.strokeRect(width / 3, 0, width / 3, height / 3);

                if (_nodes[2]) {
                    context.drawImage(_nodes[2].frames, width * 2 / 3, 0, width / 3, height / 3);
                    context.fillText(_nodes[2].name, width * 2 / 3 + 5, 15);
                    if (_nodes[2].videoRecording) context.drawImage(icon_record, width - 25, 32, 15, 15);
                }

                context.strokeRect(width * 2 / 3, 0, width / 3, height / 3);

                if (_nodes[3]) {
                    context.drawImage(_nodes[3].frames, 0, height / 3, width / 3, height / 3);
                    context.fillText(_nodes[3].name, 5, height / 3 + 15);                
                    if (_nodes[3].videoRecording) context.drawImage(icon_record, width / 3 - 25, height / 3 + 32, 15, 15);
                }

                context.strokeRect(0, height / 3, width / 3, height / 3);

                if (_nodes[4]) {
                    context.drawImage(_nodes[4].frames, width / 3, height / 3, width / 3, height / 3);
                    context.fillText(_nodes[4].name, width / 3 + 5, height / 3 + 15);
                    if (_nodes[4].videoRecording) context.drawImage(icon_record, width * 2 / 3 - 25, height / 3 + 32, 15, 15);
                }

                context.strokeRect(width / 3, height / 3, width / 3, height / 3);

                if (_nodes[5]) {
                    context.drawImage(_nodes[5].frames, width * 2 / 3, height / 3, width / 3, height / 3);
                    context.fillText(_nodes[5].name, width * 2 / 3 + 5, height / 3 + 15);
                    if (_nodes[5].videoRecording) context.drawImage(icon_record, width - 25, height / 3 + 32, 15, 15);
                }

                context.strokeRect(width * 2 / 3, height / 3, width / 3, height / 3);

                if (_nodes[6]) {
                    context.drawImage(_nodes[6].frames, 0, height * 2 / 3, width / 3, height / 3);
                    context.fillText(_nodes[6].name, 5, height * 2 / 3 + 15);
                    if (_nodes[6].videoRecording) context.drawImage(icon_record, width / 3 - 25, height * 2 / 3 + 32, 15, 15);
                }

                context.strokeRect(0, height * 2 / 3, width / 3, height / 3);

                if (_nodes[7]) {
                    context.drawImage(_nodes[7].frames, width / 3, height * 2 / 3, width / 3, height / 3);
                    context.fillText(_nodes[7].name, width / 3 + 5, height * 2 / 3 + 15);
                    if (_nodes[7].videoRecording) context.drawImage(icon_record, width * 2 / 3 - 25, height * 2 / 3 + 32, 15, 15);
                }

                context.strokeRect(width / 3, height * 2 / 3, width / 3, height / 3);

                if (_nodes[8]) {
                    context.drawImage(_nodes[8].frames, width * 2 / 3, height * 2 / 3, width / 3, height / 3);
                    context.fillText(_nodes[8].name, width * 2 / 3 + 5, height * 2 / 3 + 15);
                    if (_nodes[8].videoRecording) context.drawImage(icon_record, width - 25, height * 2 / 3 + 32, 15, 15);
                }

                context.strokeRect(width * 2 / 3, height * 2 / 3, width / 3, height / 3);
            }

            if (_length > 9 && _length <= 16) {
                if (_nodes[0]) 
                    context.drawImage(_nodes[0].frames, 0, 0, width / 4, height / 4);
                if (_nodes[1])
                    context.drawImage(_nodes[1].frames, width / 4, 0, width / 4, height / 4);
                if (_nodes[2])
                    context.drawImage(_nodes[2].frames, width * 2 / 4, 0, width / 4, height / 4);
                if (_nodes[3])
                    context.drawImage(_nodes[3].frames, width * 3 / 4, 0, width / 4, height / 4);

                if (_nodes[4])
                    context.drawImage(_nodes[4].frames, 0, height / 4, width / 4, height / 4);
                if (_nodes[5])
                    context.drawImage(_nodes[5].frames, width / 4, height / 4, width / 4, height / 4);
                if (_nodes[6])
                    context.drawImage(_nodes[6].frames, width * 2 / 4, height / 4, width / 4, height / 4);
                if (_nodes[7])
                    context.drawImage(_nodes[7].frames, width * 3 / 4, height / 4, width / 4, height / 4);

                if (_nodes[8])
                    context.drawImage(_nodes[8].frames, 0, height * 2 / 4, width / 4, height / 4);
                if (_nodes[9])
                    context.drawImage(_nodes[9].frames, width / 4, height * 2 / 4, width / 4, height / 4);
                if (_nodes[10])
                    context.drawImage(_nodes[10].frames, width * 2 / 4, height * 2 / 4, width / 4, height / 4);
                if (_nodes[11])
                    context.drawImage(_nodes[11].frames, width * 3 / 4, height * 2 / 4, width / 4, height / 4);

                if (_nodes[12])
                    context.drawImage(_nodes[12].frames, 0, height * 3 / 4, width / 4, height / 4);
                if (_nodes[13])
                    context.drawImage(_nodes[13].frames, width / 4, height * 3 / 4, width / 4, height / 4);
                if (_nodes[14])
                    context.drawImage(_nodes[14].frames, width * 2 / 4, height * 3 / 4, width / 4, height / 4);
                if (_nodes[15])
                    context.drawImage(_nodes[15].frames, width * 3 / 4, height * 3 / 4, width / 4, height / 4);
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
