const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

function newID() {
    return uuid().replace(/-/g, '');
}

function getTime() {
    return new Date().getTime();
}

var UserSchema = new mongoose.Schema({
    id: { type: String, required: true, default: newID, index: { unique: true } },
    name: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    date: { type: Number, default: getTime },
});

UserSchema.method('toJSON', function() {
    let user = this.toObject();
    delete user.password;
    return user;
});

UserSchema.method('comparePassword', function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);

        cb(null, isMatch);
    });
});

UserSchema.static('getAuthenticated', function (name, password, cb) {
    this.findOne({ name: name }, (err, user) => {
        if (err) return cb(err);

        if (!user) {
            return cb(null, null);
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) return cb(err);

            if (isMatch) return cb(null, { name: user.name, role: user.role });
            else return cb(null, null);
        });
    });
});

module.exports = mongoose.model('User', UserSchema);