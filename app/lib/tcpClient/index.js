const net = require('net');
const url = require('url');

var client;

module.exports = {
  init: function (params) {
    return new Promise(function (resolve, reject) {
      client = new net.Socket();

      const connect = (url, params) => {
        client.connect(url.port, url.hostname, () => {
          console.log('SIGUR connected: ' + url.href);
          let cmd = ['LOGIN 1.8', params.relay.username, params.relay.password];
          client.write(cmd.join(' ') + '\n');
        });
      }

      const prepareUrl = (srcUrl) => {
        let prefixs = ['http://', 'ftp://', 'rtsp://', 'tcp://'];
        if (!prefixs.some(element => srcUrl.includes(element))) srcUrl = prefixs[0] + srcUrl;
        return url.parse(srcUrl);
      }

      let urlP = prepareUrl(params.relay.uri);

      if (urlP.port && urlP.hostname) {
        connect(urlP, params);

      } else {
        return reject("SIGUR url doesn't have hostname or port");
      }

      client.on('data', (data) => {
        resolve(client);
      });

      client.on('error', (err) => {
        if (err.code == 'ECONNREFUSED') {
          console.log('Timeout for 5 seconds before trying:' + urlP.href + ' again');
          client.setTimeout(5000, connect(urlP, params));
        } else {
          console.error('[init error]: ' + err);
          return reject(err);
        };
      });
    });
  },

  open: function (params) {
    let cmd = ['ALLOWPASS', params.relay.deviceId, 'ANONYMOUS', params.relay.direction];
    client.write(cmd.join(' ') + '\n');

    client.on('error', (err) => {
      console.error('[open error]: ' + err);
    });
  },
}
