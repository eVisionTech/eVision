const mongoose = require('mongoose');
const uuid = require('uuid/v4');

function newID() {
    return uuid().replace(/-/g, '');
}

var DeviceSchema = new mongoose.Schema({
    id: { type: String, required: true, default: newID, index: { unique: true } },
    active: { type: Boolean, default: 'true' },
    device: {
        name: { type: String },
        uri: { type: String },
        type: { type: String }
    },
    video: {
        resize: { 
            type: String,
            enum : ['', '320x240', '640x480', '1280x720'],
            default: '640x480' 
        },
        crop: { type: String },
        framerate: {
            type: String,
            enum : ['', '1', '2', '3', '4', '5'],
            default: ''
        }
    },
    ftp: {
        enable: { type: Boolean, default: 'false' },
        port: { type: String, default: '7001' }
    },
    motionDetection: {
        enable: { type: Boolean, default: 'false' },
        threshold: {
            type: String,
            enum : ['1', '2', '3', '4', '5'],
            default: '1'
        },
        area: { type: String }
    },
    videoRecording: {
        enable: { type: Boolean, default: 'false' },
        uri: { type: String }
    },
    relay: {
        uri: { type: String },
        username: { type: String },
        password: { type: String },
        token: { type: String },        
        keepOpenTimeout: { type: String, default: '3' },
        deviceId: { type: String },
        port: { type: String },
        direction: { type: String },
    },
    notif: {
        enable: { type: Boolean, default: 'false' },
        motionDetection: {
            enable: { type: Boolean, default: 'false' },
            notifMode: {
                type: String,
                enum : ['phrase', 'file'],
                default: 'phrase'
            }            
        }
    },
    event: {
        time: { type: String, default: '7:00-20:00' },
        weekend: { type: Boolean, default: 'true' },
    },
    cloud: {
        enable: { type: Boolean, default: 'false' },
    }
});

module.exports = mongoose.model('Device', DeviceSchema);