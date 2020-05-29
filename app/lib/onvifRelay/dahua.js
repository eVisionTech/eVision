const request = require('request');
const url = require('url');

module.exports = function(params) {
    let device;

    const prepareUrl = (srcUrl) => {
        let prefixs = ['http://', 'ftp://', 'rtsp://', 'tcp://'];
        if (!prefixs.some(element => srcUrl.includes(element))) srcUrl = prefixs[0] + srcUrl;
        return url.parse(srcUrl);
    }

    let urlObj = prepareUrl(params.relay.uri);

    let urlDevice = urlObj.protocol + '//' + urlObj.hostname + (urlObj.port ? ':' + urlObj.port : '');

    typeof faultylabs == "undefined" && (faultylabs = {});

    faultylabs.MD5 = function(h) {
        function r(e) {
            for (var a = [], b = 0; b < e.length; b++)
                a = a.concat(q(e[b]));
            return a
        }
        function s(e) {
            for (var a = [], b = 0; b < 8; b++)
                a.push(e & 255),
                e >>>= 8;
            return a
        }
        function b(a, b) {
            return a[b + 3] << 24 | a[b + 2] << 16 | a[b + 1] << 8 | a[b]
        }
        function q(a) {
            for (var b = [], h = 0; h < a.length; h++)
                if (a.charCodeAt(h) <= 127)
                    b.push(a.charCodeAt(h));
                else
                    for (var j = encodeURIComponent(a.charAt(h)).substr(1).split("%"), l = 0; l < j.length; l++)
                        b.push(parseInt(j[l], 16));
            return b
        }
        function t(a, b, h, j) {
            for (var l = "", i = 0, k = 0, c = 3; c >= 0; c--)
                k = arguments[c],
                i = k & 255,
                k >>>= 8,
                i <<= 8,
                i |= k & 255,
                k >>>= 8,
                i <<= 8,
                i |= k & 255,
                k >>>= 8,
                i <<= 8,
                i |= k,
                i = (i >>> 0).toString(16),
                i = "00000000".substr(0, 8 - i.length) + i,
                l += i;
            return l
        }
        function p(a) {
            for (var b = Array(a.length), h = 0; h < a.length; h++)
                b[h] = a[h];
            return b
        }
        function n(a, b) {
            return 4294967295 & a + b
        }
        var a = null
        , o = null;
        typeof h == "string" ? a = q(h) : h.constructor == Array ? h.length === 0 ? a = h : typeof h[0] == "string" ? a = r(h) : typeof h[0] == "number" ? a = h : o = typeof h[0] : typeof ArrayBuffer != "undefined" ? h instanceof ArrayBuffer ? a = p(new Uint8Array(h)) : h instanceof Uint8Array || h instanceof Int8Array ? a = p(h) : h instanceof Uint32Array || h instanceof Int32Array || h instanceof Uint16Array || h instanceof Int16Array || h instanceof Float32Array || h instanceof Float64Array ? a = p(new Uint8Array(h.buffer)) : o = typeof h : o = typeof h;
        o && alert("MD5 type mismatch, cannot process " + o);
        return function() {
            function e(a, b, e, g) {
                var h = d;
                d = f;
                var i = f = c
                , a = n(k, n(a, n(b, e)));
                c = n(i, a << g & 4294967295 | a >>> 32 - g);
                k = h
            }
            var h = a.length;
            a.push(128);
            var m = a.length % 64;
            if (m > 56) {
                for (var j = 0; j < 64 - m; j++)
                    a.push(0);
                m = a.length % 64
            }
            for (j = 0; j < 56 - m; j++)
                a.push(0);
            a = a.concat(s(h * 8));
            for (var h = 1732584193, m = 4023233417, l = 2562383102, i = 271733878, k = 0, c = 0, f = 0, d = 0, j = 0; j < a.length / 64; j++) {
                var k = h
                , c = m
                , f = l
                , d = i
                , g = j * 64;
                e(c & f | ~c & d, 3614090360, b(a, g), 7);
                e(c & f | ~c & d, 3905402710, b(a, g + 4), 12);
                e(c & f | ~c & d, 606105819, b(a, g + 8), 17);
                e(c & f | ~c & d, 3250441966, b(a, g + 12), 22);
                e(c & f | ~c & d, 4118548399, b(a, g + 16), 7);
                e(c & f | ~c & d, 1200080426, b(a, g + 20), 12);
                e(c & f | ~c & d, 2821735955, b(a, g + 24), 17);
                e(c & f | ~c & d, 4249261313, b(a, g + 28), 22);
                e(c & f | ~c & d, 1770035416, b(a, g + 32), 7);
                e(c & f | ~c & d, 2336552879, b(a, g + 36), 12);
                e(c & f | ~c & d, 4294925233, b(a, g + 40), 17);
                e(c & f | ~c & d, 2304563134, b(a, g + 44), 22);
                e(c & f | ~c & d, 1804603682, b(a, g + 48), 7);
                e(c & f | ~c & d, 4254626195, b(a, g + 52), 12);
                e(c & f | ~c & d, 2792965006, b(a, g + 56), 17);
                e(c & f | ~c & d, 1236535329, b(a, g + 60), 22);
                e(d & c | ~d & f, 4129170786, b(a, g + 4), 5);
                e(d & c | ~d & f, 3225465664, b(a, g + 24), 9);
                e(d & c | ~d & f, 643717713, b(a, g + 44), 14);
                e(d & c | ~d & f, 3921069994, b(a, g), 20);
                e(d & c | ~d & f, 3593408605, b(a, g + 20), 5);
                e(d & c | ~d & f, 38016083, b(a, g + 40), 9);
                e(d & c | ~d & f, 3634488961, b(a, g + 60), 14);
                e(d & c | ~d & f, 3889429448, b(a, g + 16), 20);
                e(d & c | ~d & f, 568446438, b(a, g + 36), 5);
                e(d & c | ~d & f, 3275163606, b(a, g + 56), 9);
                e(d & c | ~d & f, 4107603335, b(a, g + 12), 14);
                e(d & c | ~d & f, 1163531501, b(a, g + 32), 20);
                e(d & c | ~d & f, 2850285829, b(a, g + 52), 5);
                e(d & c | ~d & f, 4243563512, b(a, g + 8), 9);
                e(d & c | ~d & f, 1735328473, b(a, g + 28), 14);
                e(d & c | ~d & f, 2368359562, b(a, g + 48), 20);
                e(c ^ f ^ d, 4294588738, b(a, g + 20), 4);
                e(c ^ f ^ d, 2272392833, b(a, g + 32), 11);
                e(c ^ f ^ d, 1839030562, b(a, g + 44), 16);
                e(c ^ f ^ d, 4259657740, b(a, g + 56), 23);
                e(c ^ f ^ d, 2763975236, b(a, g + 4), 4);
                e(c ^ f ^ d, 1272893353, b(a, g + 16), 11);
                e(c ^ f ^ d, 4139469664, b(a, g + 28), 16);
                e(c ^ f ^ d, 3200236656, b(a, g + 40), 23);
                e(c ^ f ^ d, 681279174, b(a, g + 52), 4);
                e(c ^ f ^ d, 3936430074, b(a, g), 11);
                e(c ^ f ^ d, 3572445317, b(a, g + 12), 16);
                e(c ^ f ^ d, 76029189, b(a, g + 24), 23);
                e(c ^ f ^ d, 3654602809, b(a, g + 36), 4);
                e(c ^ f ^ d, 3873151461, b(a, g + 48), 11);
                e(c ^ f ^ d, 530742520, b(a, g + 60), 16);
                e(c ^ f ^ d, 3299628645, b(a, g + 8), 23);
                e(f ^ (c | ~d), 4096336452, b(a, g), 6);
                e(f ^ (c | ~d), 1126891415, b(a, g + 28), 10);
                e(f ^ (c | ~d), 2878612391, b(a, g + 56), 15);
                e(f ^ (c | ~d), 4237533241, b(a, g + 20), 21);
                e(f ^ (c | ~d), 1700485571, b(a, g + 48), 6);
                e(f ^ (c | ~d), 2399980690, b(a, g + 12), 10);
                e(f ^ (c | ~d), 4293915773, b(a, g + 40), 15);
                e(f ^ (c | ~d), 2240044497, b(a, g + 4), 21);
                e(f ^ (c | ~d), 1873313359, b(a, g + 32), 6);
                e(f ^ (c | ~d), 4264355552, b(a, g + 60), 10);
                e(f ^ (c | ~d), 2734768916, b(a, g + 24), 15);
                e(f ^ (c | ~d), 1309151649, b(a, g + 52), 21);
                e(f ^ (c | ~d), 4149444226, b(a, g + 16), 6);
                e(f ^ (c | ~d), 3174756917, b(a, g + 44), 10);
                e(f ^ (c | ~d), 718787259, b(a, g + 8), 15);
                e(f ^ (c | ~d), 3951481745, b(a, g + 36), 21);
                h = n(h, k);
                m = n(m, c);
                l = n(l, f);
                i = n(i, d)
            }
            return t(i, l, m, h).toUpperCase()
        }()
    }

    function hex_md5(h) {
        return faultylabs.MD5(h)
    }

    function firstLogin() {
        return new Promise((resolve, reject) => {
            let form = JSON.stringify({
                'method': 'global.login',
                'params': {
                    'userName': params.relay.username,
                    'password': '',
                    'clientType': 'Web3.0'
                },
                'id': 1,
                'session': 0
            });

            request.post({
                url: urlDevice + '/RPC2_Login',
                body: form
            }, (err, response, body) => {
                if (err) reject(err);
                resolve(JSON.parse(response.body));
            });
        });
    }

    function secondLogin(data) {
        return new Promise((resolve, reject) => {
            let e = data.params.realm,
                c = data.params.realm,
                f = hex_md5(params.relay.username + ":" + e + ":" + params.relay.password);
            f = hex_md5(params.relay.username + ":" + c + ":" + f);

            let form = JSON.stringify({
               'method': 'global.login',
               'params': {
                  'userName': params.relay.username,
                  'password': f,
                  'clientType': 'Web3.0',
                  'realm': data.params.realm,
                  'random': data.params.realm,
                  'passwordType': 'Default'
               },
               'id': data.id + 1,
               'session': data.session
            });

            request.post({
                url: urlDevice + '/RPC2_Login',
                headers: {
                    'Cookie': 'DhWebClientSessionID=' + data.session
                },
                body: form
            }, (err, response, body) => {
                if (err) reject(err);
                resolve(JSON.parse(response.body));
            });
        });
    }

    function accessDoor(data) {
        return new Promise((resolve, reject) => {
            let form = JSON.stringify({
               'method': 'accessControl.factory.instance',
               'params': {
                  'channel': 0
               },
               'id': data.id + 1,
               'session': data.session
            });

            request.post({
                url: urlDevice + '/RPC2',
                headers: {
                    'Cookie': 'DhWebClientSessionID=' + data.session
                },
                body: form
            }, (err, response, body) => {
                if (err) reject(err);
                resolve(JSON.parse(response.body));
            });
        });
    }

    function openDoor(data) {
        return new Promise((resolve, reject) => {
            device = data.result;
            let form = JSON.stringify({
               'method': 'accessControl.openDoor',
               'params': {
                  'Type': 'Remote',
               },
               'id': data.id + 1,
               'session': data.session,
               'object': device
            });

            request.post({
                url: urlDevice + '/RPC2',
                headers: {
                    'Cookie': 'DhWebClientSessionID=' + data.session
                },
                body: form
            }, (err, response, body) => {
                if (err) reject(err);
                resolve(JSON.parse(response.body));
            });
        });
    }

    function destroyAccess(data) {
        return new Promise((resolve, reject) => {
            let form = JSON.stringify({
               'method': 'accessControl.destroy',
               'params': null,
               'id': data.id + 1,
               'session': data.session,
               'object': device
            });

            request.post({
                url: urlDevice + '/RPC2',
                headers: {
                    'Cookie': 'DhWebClientSessionID=' + data.session
                },
                body: form
            }, (err, response, body) => {
                if (err) reject(err);
                resolve(JSON.parse(response.body));
            });
        });
    }

    function logout(data) {
        return new Promise((resolve, reject) => {
            let form = JSON.stringify({
               'method': 'global.logout'
            });

            request.post({
                url: urlDevice + '/',
                headers: {
                    'Cookie': 'DhWebClientSessionID=' + data.session
                },
                body: form
            }, (err, response, body) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    firstLogin()
    .then(secondLogin)
    .then(accessDoor)
    .then(openDoor)
    .then(destroyAccess)
    .then(logout)
    .catch((err) => {
        console.error(err);
    })
}
