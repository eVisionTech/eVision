const request = require('request');
    
module.exports = function(params) {
    function ranString(paranum) {
        let reString, dtmp, i, itmp;
        dtmp = new Date();
        reString = dtmp.getMilliseconds().toString();
        itmp = paranum - reString.length;
        for (i = 0; i < itmp; i++) {
            x = parseInt(Math.random() * (10 - 1)) + 1;
            reString += x.toString();
        }
        return reString;
    }

    function action(pCTRL) {
        return new Promise((resolve, reject) => {
            let strURL = params.relay.uri + '/webs/btnSettingEx';
            let pFlag = 4600; // флаг открытия/закрытия двери
            let nwindow = 0; // канал
            let pCMD = 0;            
            let pSTEP = 0;
            let PRES = 0;
            let nRanstr = ranString(8);
            
            strURL = strURL + "?flag=" + pFlag + "&paramchannel=" + nwindow + "&paramcmd=" + pCMD + "&paramctrl=" + pCTRL + "&paramstep=" + pSTEP + "&paramreserved=" + PRES + "&UserID=" + nRanstr + "";

            let options = {
                uri: strURL,
                auth: {
                    user: params.relay.username,
                    pass: params.relay.password,
                    sendImmediately: false
                }
            };

            request(options, (error, response, body) => {
                if (error) reject(error);
                resolve();
            });
        });
    }

    action(1).then(() => {
        setTimeout(function() {
            action(0);
          }, params.relay.keepOpenTimeout * 1000);
    })
    .catch((err) => {
        console.error(err);
    })

}