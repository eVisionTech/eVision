const Canvas = require("./../canvas");
const Image = Canvas.Image;

function applyThreshold(value, threshold) {
    return (value > threshold) ? true : false;
}

function frameDiff(prev, curr, options) {
    if (prev == null || curr == null) return false;

    const p = prev.data;
    const c = curr.data;

    let idxR, idxG, idxB;
    let diffR, diffG, diffB;
    let count = 0;
    for (let idx = 0; idx < p.length; idx += 4) {
        let innerCount = 0;
        idxR = idx + 0;
        idxG = idx + 1;
        idxB = idx + 2;
        diffR = Math.abs(p[idxR] - c[idxR]);
        diffG = Math.abs(p[idxG] - c[idxG]);
        diffB = Math.abs(p[idxB] - c[idxB]);
        if (applyThreshold(diffR / 255, options.pixelDiffThreshold)) innerCount++;
        if (applyThreshold(diffG / 255, options.pixelDiffThreshold)) innerCount++;
        if (applyThreshold(diffB / 255, options.pixelDiffThreshold)) innerCount++;
        count += innerCount;
    }
    return count / 3;
}

function detect(frames, options) {
    let diff = frameDiff(frames.prev, frames.curr, options);    
    if (!diff) return false;
    let totalPix = frames.curr.data.length / 4;
    if (diff / totalPix < options.movementThreshold)
        return false;
    else 
        return true;
}


module.exports = function (frames, params) {
    return new Promise((resolve, reject) => {

        var images = {
            prev: new Image(),
            curr: new Image()
        }

        images.prev.onerror = function (e) {
            reject(e);
        };

        images.curr.onerror = function (e) {
            reject(e);
        };

        images.curr.onload = function () {
            let _movementThreshold;
            switch (params.motionDetection.threshold) {
                case '1':
                    _movementThreshold = 0.001;
                    break;
                case '2':
                    _movementThreshold = 0.01;
                    break;
                case '3':
                    _movementThreshold = 0.03;
                    break;
                case '4':
                    _movementThreshold = 0.1;
                    break;
                case '5':
                    _movementThreshold = 0.2;
                    break;
            }

            let options = {
                movementThreshold: _movementThreshold,
                pixelDiffThreshold: 0.3
            }

            let canvases = {
                prev: Canvas.createCanvas(320, 240),
                curr: Canvas.createCanvas(320, 240),
            }

            let ctxs = {
                prev: canvases.prev.getContext('2d'),
                curr: canvases.curr.getContext('2d')
            }

            ctxs.prev.drawImage(images.prev, 0, 0, images.prev.width, images.prev.height, 0, 0, canvases.prev.width, canvases.prev.height);
            ctxs.curr.drawImage(images.curr, 0, 0, images.curr.width, images.curr.height, 0, 0, canvases.curr.width, canvases.curr.height);

            let imageDatas = {
                prev: ctxs.prev.getImageData(0, 0, images.prev.width, images.prev.height),
                curr: ctxs.curr.getImageData(0, 0, images.curr.width, images.curr.height)
            }

            resolve(detect(imageDatas, options));
        };

        try {
            images.prev.src = new Buffer(frames.prev, 'binary');
            images.curr.src = new Buffer(frames.curr, 'binary');
        } catch (e) {
            reject(e);
        };
    });
}
