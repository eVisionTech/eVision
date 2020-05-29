const path = require('path');
const multer = require('multer');
const enfsensure = require("enfsensure");

var data_path = process.env.data_path || 'data';

var uploadAudio = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            enfsensure.ensureDir(path.resolve(data_path, 'media'), (err, temp) => {
                cb(null, path.resolve(data_path, 'media'))
            })
        },
        filename: function (req, file, cb) {
            cb(null, req.query.filename + '.mp3')
        }
    })
});

module.exports = function (app, conf) {
    app.post('/api/v1/Upload/Audio', uploadAudio.single('fileData'), function (req, res, next) {
        if (req.xhr) {
            return res.json({
                success: true
            });
        } else {
            res.redirect('/');
        }
    })
}

