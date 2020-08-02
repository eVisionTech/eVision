const WebSocketClient = require('../webSocketClient');

module.exports = function (params, app) {
    if (!params.cloud.enable || !params.id) return function () { };

    var active = false;
    var autoReconnectInterval = 2000,
        url = 'wss://media.evision.tech/stream?id=' + params.id + '&type=' + (params.relay.uri ? 1 : 0) + '&ver=' + conf.version;

    var client = new WebSocketClient();
    client.autoReconnectInterval = autoReconnectInterval;
    client.open(url);
    client.onopen = function () {
        console.log('Media server connected');
    }

    client.onclose = function (e) {
        console.log('Media server connection closed');
    }

    client.onerror = function (e) {
        console.log('error', e);
    }

    client.onmessage = function (message) {
        try {
            var res = JSON.parse(message);
            console.log('Streaming ' + message);
            if ('active' in res)
                active = res.active;
            if ('show' in res) {
                app.wss.broadcast('actionShow|' + params.id, { binary: false });
            }
        } catch (e) { 
            console.log(e)
            app.wss.broadcast(message, { binary: false });
        }
    };

    setInterval(function () {
        if (client && client.instance.readyState == 1)
            client.send(JSON.stringify({ action: 'ping' }))
    }, 1000 * 15);

    return function (data) {
        if (active && client.instance.readyState == 1) {
            client.send(data);
        }
    }
}
