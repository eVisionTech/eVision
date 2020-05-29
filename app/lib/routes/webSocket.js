const WebSocket = require('ws');

module.exports = function (server) {
    const wss = new WebSocket.Server({ server: server });

    wss.restart = function () {
        wss.clients.forEach((client) => {
            if (client.readyState == 1 && client._id) {
                client.close();
            }
        })
    };

    wss.broadcast = function (data) {
        wss.clients.forEach((client) => {
            if (client.readyState == 1 && !client._id) {
                client.send(data);
            }
        })
    };

    wss.checkExist = function (id) {
        let exist = false;
        wss.clients.forEach((client) => {
            if (client._id == id) {
                exist = true;
            }
        })
        return exist;
    };

    wss.on('connection', (ws, req) => {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        ip = ip.split(',')[0];
        let wsKey = req.headers['sec-websocket-key'];
        console.log(`Web socket client connected from ${ip} ${wsKey}`)

        ws.on('message', (data) => {
            try {
                let res = JSON.parse(data);
                if (res.action == 'changeCam' || res.action == 'checkUpdate')
                    wss.emit(res.action, res.data)                    
                else if (res.action == 'streamOff') {
                    if (!ws._streamOffInterval) {
                        ws._streamOffInterval = setInterval(function () {
                            ws.onError('WebSocket stream lost connection');
                        }, 5000);
                    }
                }                
            } catch (err) {
                if (err) console.error(err);
            }
        })

        ws.on('close', (data) => {
            if (ws._streamOffInterval) clearInterval(ws._streamOffInterval);
            console.log('Web socket client disconnected');
        });

        ws.on('error', (err) => {
            console.error(err);
        });
    })
    return wss;
};
