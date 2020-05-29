const request = require('request');
const url = require('url');
module.exports = {
    get_video: function(input_uri, cb) {
        const prepareUrl = (srcUrl) => {
            let prefixs = ['http://', 'https://', 'ftp://', 'rtsp://', 'tcp://'];
            if (!prefixs.some(element => srcUrl.includes(element))) srcUrl = prefixs[0] + srcUrl;
            return url.parse(srcUrl);
        }
    
        let urlObj = prepareUrl(input_uri);
    
        var resource_guid, XXXYYY, host;
    
        function step1_tvinfo_getredirect() {
            return new Promise((resolve, reject) => {
                let link_guid = urlObj.pathname.split('/')[2];
                let _url =  urlObj.protocol + '//' + urlObj.hostname + '/tv-info?link_guid=' + link_guid;
    
                request.get({
                    url: _url
                }, (err, response, body) => {
                    if (err) reject(err);
                    try {
                        let r = JSON.parse(response.body);
                        resolve(r);
                    } catch (e) {
                        reject(err);
                    }
                });
            });
        }
    
        function step2_tvinfo_getchannel(json) {
            return new Promise((resolve, reject) => {
                let link_guid = urlObj.pathname.split('/')[2];
                let _url =  urlObj.protocol + '//' + (json.redirect || urlObj.hostname) + '/tv-info?link_guid=' + link_guid;
    
                request.get({
                    url: _url
                }, (err, response, body) => {
                    if (err) reject(err);
                    try {
                        let r = JSON.parse(response.body);
                        resource_guid = r.channels[0].resource_guid;
                        resolve(r);
                    } catch (e) {
                        reject(err);
                    }
                });
            });
        }
    
        function step3_tv_getredirect(json) {
            return new Promise((resolve, reject) => {
                let link_guid = urlObj.pathname.split('/')[2];
                let _url =  urlObj.protocol + '//' + urlObj.hostname + '/tv?link=' + link_guid + '&mode=live';
    
                request.get({
                    url: _url
                }, (err, response, body) => {
                    if (err) reject(err);        
                    try {
                        let r = JSON.parse(response.body);
                        resolve(r);
                    } catch (e) {
                        reject(err);
                    }
                });
            });
        }
    
        function step4_tv_getauth1(json) {
            return new Promise((resolve, reject) => {
                let link_guid = urlObj.pathname.split('/')[2];
                let _url =  urlObj.protocol + '//' + json.redirect + '/tv?link=' + link_guid + '&mode=live';
    
                request.get({
                    url: _url
                }, (err, response, body) => {
                    if (err) reject(err);
                    try {
                        let r = JSON.parse(response.body);
                        resolve(r);
                    } catch (e) {
                        reject(err);
                    }
                });
            });
        }
    
        function step5_tv_getXXXYYY(json) {
            return new Promise((resolve, reject) => {
                let _url =  urlObj.protocol + '//' + json.redirect + '/tv';
    
                let form = JSON.stringify(json.present_this_to_authorize);
    
                request.post({
                    url: _url,
                    body: form
                }, (err, response, body) => {
                    if (err) reject(err);
                    try {
                        let r = JSON.parse(response.body);
                        XXXYYY = r.XXXYYY;
                        host = r.host;
                        resolve(r);
                    } catch (e) {
                        reject(err);
                    }
                });
            });
        }
    
        function step6_tv_login2(json) {
            return new Promise((resolve, reject) => {
                let _url =  urlObj.protocol + '//' + json.host + '/t/' + json.XXXYYY + '/tvlogin';
    
                let form = JSON.stringify(json.auth);
    
                request.post({
                    url: _url,
                    body: form
                }, (err, response, body) => {
                    if (err) reject(err);
                    try {
                        let r = JSON.parse(response.body);
                        resolve(r);
                    } catch (e) {
                        reject(err);
                    }
                });
            });
        }
    
        function step7_get_video(json) {
            return new Promise((resolve, reject) => {
                let _url =  urlObj.protocol + '//' + host + '/t/' + XXXYYY + '/get_video';
    
                let form = 'sid=' + json.sid + '&channel=' + resource_guid + '&container=hls&server=&segment_duration=1&stream=main&mute=true'
    
                request.post({
                    url: _url,
                    body: form
                }, (err, response, body) => {
                    if (err) reject(err);
                    try {
                        let r = JSON.parse(response.body);
                        let __url =  urlObj.protocol + '//' + host + '/t/' + XXXYYY + '/hls/' + r.token;
                        resolve(__url);
                    } catch (e) {
                        reject(err);
                    }
                });
            });
        }
    
        function step8_get_id(__url) {
            return new Promise((resolve, reject) => {
                request.post({
                    url: __url + "/master.m3u8"
                }, (err, response, body) => {
                    if (err) reject(err);
                    try {
                        let id = response.body.split('\n')[2].trim()//.splilt('.')[0];
                        resolve(__url + '/' + id);
                    } catch (e) {
                        reject(err);
                    }
                });
            });
        }
    
        step1_tvinfo_getredirect()
        .then(step2_tvinfo_getchannel)
        .then(step3_tv_getredirect)
        .then(step4_tv_getauth1)
        .then(step5_tv_getXXXYYY)
        .then(step6_tv_login2)
        .then(step7_get_video)
        .then(step8_get_id)
        .then((url) => { cb(null, url); })
        .catch((err) => {
            cb(err, null);
        })
    }
}