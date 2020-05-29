const onvif = require('./node-onvif');

module.exports = function(params) {
    let debug = true;
    function init() {
        return new onvif.OnvifDevice({
            xaddr: params.relay.uri,
            user: params.relay.username,
            pass: params.relay.password,
        });
    }

    function open() {
        if (params.device.type == 'Beward_DKS15120') {
            require('./beward_dks15120')(params);
        }
        else if (params.device.type == 'Beward_DKS15122') {
            require('./beward_dks15122')(params);
        }
        else if (params.device.type == 'Dahua' || params.device.type == 'TrueIP') {
            require('./dahua')(params);
        }
        else if (params.device.type == 'Rodos') {
            require('./rodos')(params);
        }
        else if (params.device.type == 'Mqtt') {
            require('./mqtt')(params);
        }
        else if (params.device.type == 'Nateks') {
            require('./nateks')(params);
        }
        else {
            if (!params.relay.uri || !params.relay.username || !params.relay.password || !params.relay.token)
            return console.error('Onvif parametrs not found');

            let device = init();
            let RelayOutputToken = params.relay.token;
            let DelayTime = params.onvifDelayTime || 2;

            let paramsOpen = {
                RelayOutputToken: RelayOutputToken,
                Mode: 'Monostable',
                DelayTime: 'PT' + DelayTime + 'S',
                IdleState: 'open'
            };

            let paramsClosed = {
                RelayOutputToken: RelayOutputToken,
                Mode: paramsOpen.Mode,
                DelayTime: paramsOpen.DelayTime,
                IdleState: 'closed'
            };

            let paramsActive = {
                RelayOutputToken: RelayOutputToken,
                state: 'active'
            };

            let paramsInactive = {
                RelayOutputToken: RelayOutputToken,
                state: 'inactive'
            };

            if (params.device.type == 'Beward_DS06M') {
                device.services.device.SetRelayOutputState(paramsActive)
                return;
            }

            if (params.device.type == 'Beward')
                device.services.device.setRelayOutputSettings(paramsOpen, (err, result) => {
                    if (err) return console.error(err);
                    setTimeout(function() {
                        device.services.device.setRelayOutputSettings(paramsClosed, (err, result) => {
                            if (debug) setState();
                        });
                    }, DelayTime * 1000);
                    setState()
                });
            else
                device.services.device.SetRelayOutputState(paramsOpen, (err, result) => {
                    if (err) return console.error(err);
                    setTimeout(function() {
                        device.services.device.SetRelayOutputState(paramsClosed, (err, result) => {
                            if (debug) setState();
                        });
                    }, DelayTime * 1000);
                    setState()
                });

            function setState() {
                device.services.device.getRelayOutputs((err, result) => {
                    if (err) console.error(err, result.data.GetRelayOutputsResponse);
                });
            }
        }

    }
    return {
        open: open
    }
}
