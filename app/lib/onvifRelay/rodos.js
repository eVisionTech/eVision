const request = require('request');
const url = require('url');

module.exports = function(params) {

    const prepareUrl = (srcUrl) => {
        let prefixs = ['http://', 'ftp://', 'rtsp://', 'tcp://'];
        if (!prefixs.some(element => srcUrl.includes(element))) srcUrl = prefixs[0] + srcUrl;
        return url.parse(srcUrl);
    }

    let urlObj = prepareUrl(params.relay.uri);
    let hostnamewp = urlObj.hostname + (urlObj.port ? ':' + urlObj.port : '');
    let urlOn = 'http://' + hostnamewp + '/protect/rb' + (params.relay.direction - 1) + 'n.cgi';
    let urlOff = 'http://' + hostnamewp + '/protect/rb' + (params.relay.direction - 1) + 'f.cgi';
    let auth = "Basic " + new Buffer(params.relay.username + ":" + params.relay.password).toString("base64");

    function open() {
        return new Promise((resolve, reject) => {
          request({
            url : urlOn,
            headers : {
              "Authorization" : auth
            }
          }, (err, response, body) => {
            if (err) reject(error);
            resolve();
          }
          );
        });
    }

    function close() {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          request({
              url : urlOff,
              headers : {
                "Authorization" : auth
              }
            }, (err, response, body) => {
              if (err) reject(err);
              resolve();
            }
          );
        }, params.relay.keepOpenTimeout * 1000);
      });
  }

    open()
    .then(close)
    .catch((err) => {
        console.error(err);
    })
}
