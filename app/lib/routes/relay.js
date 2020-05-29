
const onvifRelay = require('../onvifRelay');
const tcpCleint = require('../tcpClient');

module.exports = function (app, conf) {
    app.get('/api/v1/Open/:id', (req, res, next) => {
        if (!req.params.id)
            return res.json({
                success: false,
                msg: "id parametr not found"
            });

        let params = conf && conf.nodes && conf.nodes.filter((item) => { return (item.id == req.params.id) })[0]

        if (params.device.type == 'SIGUR') {
            if (!params.relay.uri || !params.relay.port || !params.relay.username || !params.relay.password || !params.relay.deviceId || !params.relay.direction)
                return res.json({
                    success: false,
                    msg: "SIGUR parametrs not set"
                });
            tcpCleint.open(params);
            return res.json({
                success: true
            });
        } else if (params.device.type == 'Mqtt') {
            if (!params.relay.uri || !params.relay.deviceId)
                return res.json({
                    success: false,
                    msg: "Mqtt parametrs not set"
                });
            onvifRelay(params).open();
            return res.json({
                success: true
            });
        } else {
            if (!params.relay.uri || !params.relay.username || !params.relay.password)
                return res.json({
                    success: false,
                    msg: "Onvif parametrs not set"
                });
            onvifRelay(params).open();
            return res.json({
                success: true
            });
        }
    });

}
