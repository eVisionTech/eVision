const path = require('path')
const findRemoveSync = require('find-remove');

const Video = require('../db/models/video');

var data_path = process.env.data_path || 'data';
var logVideosPath = path.resolve(data_path, 'videos');

module.exports = function (app, params = {}) {
    function rotate() {
        console.log('rotate:');
        var res = Object.assign({}, res, findRemoveSync(logVideosPath, {
            age: {
                seconds: 86400 * (params.storage.video || 3)
            },
            extensions: '.mp4'
        }));

        if (Object.keys(res).length)
            console.log('removed files', res);

        let dateV = new Date();
        dateV.setDate(dateV.getDate() - (params.storage.video || 3));

        Video.deleteMany({
            date: { $lte : dateV.getTime() }
        }, (err) => {
            if (err) console.error(err);
        });
    };

    rotate();

    setInterval(rotate, 3600000);    
}
