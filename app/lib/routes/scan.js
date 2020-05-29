const onvif = require('node-onvif');

module.exports = function (app) {
  app.get('/api/v1/DeviceScanner', function(req, res) {

    let devs = [];

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error("Nothing found")), 4000);

      console.log('[Device Scanner] Start the discovery process.');
      onvif.startProbe()
        .then((devices) => {
          console.log('[Device Scanner]', devices.length, 'devices were found.');
          devices.forEach((device) => {
            let odevice = new onvif.OnvifDevice({
              xaddr: device.xaddrs[0]
            });
            devs.push({
              name: device.name,
              hardware: device.hardware,
              address: odevice.address
            });
          })
        })
        .then(() => resolve(devs));
    })

    promise.then(
      devs => {
        res.jsonp({ success: true, devices: devs })
      },
      error => {
        res.jsonp({ success: false })
    });
  })
}