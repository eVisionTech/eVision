const mongoose = require('mongoose');

var SettingsSchema = new mongoose.Schema({
    lang: { type: String, default: 'en-US' },
    theme: { type: String, default: 'dark' },
    storage: {
        video: { type: String, default: '3' }
    },
    nat: {
        enable: { type: Boolean, default: 'false' },
        externalIP: { type: String },
        externalPort: { type: String },
        internalPort: { type: String }
    },
    upnp: {
        enable: { type: Boolean, default: 'false' },
        deviceName: { type: String, default: 'eVision' },
        iface: { type: String }
    }
});

module.exports = mongoose.model('Settings', SettingsSchema);