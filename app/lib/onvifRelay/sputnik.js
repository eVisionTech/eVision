const request = require('request');
const url = require('url');

module.exports = function(params) {

    function openDoor() {
        return new Promise((resolve, reject) => {
          request.get(params.relay.uri, {
            'auth': {
              'bearer': params.relay.token
            }
          }, (err, res, body) => {
              if (err) reject(err);
              resolve();
          });
        });
    }

    openDoor()
    .catch((err) => {
        console.error(err);
    })
}
