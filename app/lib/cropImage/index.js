const Canvas = require("./../canvas");
const Image = Canvas.Image;

var img = new Image();

module.exports = function(urlData, coord) {
    return new Promise((resolve, reject) => {
        img.onerror = function(err) {
            reject(err)
        }

        img.onload = function() {
            let w = Number(coord.w);
            let h = Number(coord.h);

            let canvas = Canvas.createCanvas(w, h)
            let ctx = canvas.getContext('2d')

            ctx.imageSmoothingEnabled = true;

            if (!coord.x || !coord.y)
              ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h) ;
            else
              ctx.drawImage(img, Number(coord.x), Number(coord.y), w, h, 0, 0, w, h) ;

            canvas.toDataURL('image/jpeg', (err, jpeg) => {
		        if (err) return reject(err); 
                resolve(jpeg);
            })
        }
        
        try {
            img.src = urlData;
        } catch (e) {
            reject(e);
        };
    })
}