const request = require('request');
const url = require('url');
    
module.exports = function(params) {
    function action() {
        return new Promise((resolve, reject) => {
            let strURL = params.relay.uri + '/cgi-bin/intercom_cgi?action=maindoor';
            let options = {
                uri: strURL,
                auth: {
                    user: params.relay.username,
                    pass: params.relay.password,
                    sendImmediately: false
                }
            };

            request(options, function(error, response, body){
		        //console.log(body);
                if (error) reject(error);
                resolve();
            });
        });
    }

    action(1).then(() => {
    })
    .catch((err) => {
        console.log(err);
    })

}