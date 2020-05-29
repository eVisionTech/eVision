const upnp = require("./peer-upnp");
const http = require("http");
const uuid = require('uuid/v4');

function newID() {
    return uuid().replace(/-/g, '');
}

module.exports = function (app, conf) {
    if (conf.upnp.enable && conf.upnp.deviceName) {
        const server = http.createServer();
        const PORT = app.get('port') + 2; 

        server.listen(PORT);
        
        var peer = upnp.createPeer({
            prefix: "/upnp",
            server: server,
            hostname: conf.upnp.iface,
            port: PORT
        }).on("ready", (peer) => {
            console.log('HTTP UPNP server ready on ' + conf.upnp.iface + ':' + PORT);    
            device.advertise();
        }).on("close", (peer) => {
            peer.close();
            console.log('HTTP UPNP server closed on ' + conf.upnp.iface + ':' + PORT); 
        }).start();

        var device = peer.createDevice({
            autoAdvertise: false,
            uuid: newID(),
            productName: "eVision",
            productVersion: conf.version,
            domain: "schemas-upnp-org",
            type: "RemoteUIClientDevice",
            version: "1",
            friendlyName: conf.upnp.deviceName || "eVision",
            manufacturer: "ООО 'Дигт-Телеком'",
            manufacturerURL: "http://digt.ru/",
            modelName: "eVision",
            modelDescription: "eVision",
            modelNumber: conf.version,
            modelURL: "https://www.evision.tech/",
            UPC: "841486789412",
            presentationURL: "http://" + conf.upnp.iface + ':' + app.get('port')
        });
    }
    
}
