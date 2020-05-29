const mqtt = require('mqtt');
const url = require('url');
var mqttClient = {};

module.exports = function (params) {

  const prepareUrl = (srcUrl) => {
    let prefixs = ['http://', 'ftp://', 'rtsp://', 'tcp://', 'mqtt://'];
    if (!prefixs.some(element => srcUrl.includes(element))) srcUrl = prefixs[0] + srcUrl;
    return url.parse(srcUrl);
  }

  let urlObj = prepareUrl(params.relay.uri);
  let hostnamewp = urlObj.hostname + (urlObj.port ? ':' + urlObj.port : '');
  let auth = (params.relay.username && params.relay.password) ? (params.relay.username + ":" + params.relay.password + '@') : '';
  let urlShema = 'mqtt://' + auth + hostnamewp;

  function send(data) {
    if (mqttClient && mqttClient.connected) {
      mqttClient.publish(params.relay.deviceId, data);
      console.log('mqtt send: ', params.relay.deviceId, data)
    }
  }

  function open() {
    return new Promise((resolve, reject) => {
      send('1');
      resolve();
    });
  }

  function close() {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        send('0');
        resolve();
      }, params.relay.keepOpenTimeout * 1000);
    });
  }

  if (!mqttClient.connected) {
    console.log('mqtt shema', urlShema)
    mqttClient = mqtt.connect(urlShema);
    mqttClient.on('connect', function () {
      console.log('Connected to mqtt server ' + urlShema)
      next();
    });
  } else next()

  function next() {
    open()
      .then(close)
      .catch((err) => {
        console.log(err);
      })
  }
}
