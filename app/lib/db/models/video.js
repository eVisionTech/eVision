const mongoose = require('mongoose');
const uuid = require('uuid/v4');

function newID() {
    return uuid().replace(/-/g, '');
}

function getTime() {
    return new Date().getTime();
}

var VideoSchema = new mongoose.Schema({
    id: { type: String, required: true, default: newID, index: { unique: true } },
    sourceId: { type: String, required: true },
    date: { type: Number, default: getTime },
    filename: { type: String },
    start: { type: Number },
    end: { type: Number },
    duration: { type: Number }
});

module.exports = mongoose.model('Video', VideoSchema);