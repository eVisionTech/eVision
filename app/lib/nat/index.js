const natUpnp = require('nat-upnp');

module.exports = function (app, conf, save) {
  if (conf.nat.enable || (conf.nat.externalPort && conf.nat.externalIP)) {
    const client = natUpnp.createClient();
    let NATExternalPort = conf.nat.externalPort || 4000;
    let NATInternalPort = process.env.WEB_PORT || 4000;

    client.portUnmapping({ public: NATExternalPort }, (err) => {
      if (err) return console.error(err);
      delete conf.nat.externalIP;
      if (!conf.nat.enable) return save();
      client.externalIp((err, NATExternalIP) => {
        if (err) return console.error(err);
        client.portMapping({
          public: NATExternalPort,
          private: NATInternalPort,
          local: false,
          ttl: 0
        }, (err) => {
          if (err) return console.error(err);
          client.getMappings(function (err, results) {
            if (err) return console.error(err);
            let res = results.filter((rec) => {
              return conf.ifaces.filter((iface) => {
                return rec.private.host == iface.address;
              });              
            })[0];
            console.log('NAT - uPnP:', NATExternalIP, res);
            if (!res) return;
            conf.nat.internalPort = NATInternalPort;
            conf.nat.externalIP = NATExternalIP;
            conf.nat.externalPort = NATExternalPort;
            return save();
          });
        });
      });
    });
  }
}
