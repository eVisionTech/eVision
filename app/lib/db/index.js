const express = require('express');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();

const Device = require('./models/device');
const User = require('./models/user');
const Video = require('./models/video');

const hashPassword = function (password, cb) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return cb(err);
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return cb(err);
            return cb(null, hash);
        });
    });
}

module.exports = {
    init: function (app, cb) {
        const db_uri = `mongodb://${app.mongo_auth.hostname}:${app.mongo_auth.port}/${app.mongo_auth.db}`;

        mongoose.connect(db_uri, { useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
            if (err) console.error(`[mongodb] connection ${err}`);
            cb();
        });

        mongoose.connection.on('open', (ref) => {
            console.log('[mongodb] Connected to mongo server');
        })

        mongoose.connection.on('error', (err) => {
            console.error(`[mongodb] ${err}`);
        });
    },
    restify: function (app) {
        restify.serve(router, Device, {
            idProperty: 'id',
            private: ['_id', '__v'],
            preCreate: (req, res, next) => {
                req.body = require('../settings')(req.body)
                return next();
            },
            preUpdate: (req, res, next) => {
                if (req.body.relay.uri) req.body = require('../settings')(req.body)
            }
        });
        
        restify.serve(router, User, {
            idProperty: 'id',
            private: ['_id', '__v'],
            findOneAndUpdate: false,
            findOneAndRemove: false,
            readPreference: 'primary',
            totalCountHeader: true,
            preCreate: (req, res, next) => {
                hashPassword(req.body.password, (err, hash) => {
                    if (err) return res.json({ error: `[mongodb] ${err}` });
                    req.body.password = hash;
                    return next();
                })
            },
            preUpdate: (req, res, next) => {
                User.find({ role: 'admin' }, (err, admins) => {
                    if (err) console.error(`[mongodb] ${err}`);
                    if (req.erm.document.role == 'admin' && req.body.role && req.body.role == 'user' && admins.length == 1 && admins[0].id == req.erm.document.id) 
                        return res.json({ error: 'edit_last_admin' });
                    else {
                        if (req.body.password) {
                            hashPassword(req.body.password, (err, hash) => {
                                if (err) return res.json({ error: `[mongodb] ${err}` });
                                req.body.password = hash;
                                return next();
                            });
                        } else return next();
                    }
                });
            },
            preDelete: (req, res, next) => {
                User.find({ role: 'admin' }, (err, admins) => {
                    if (err) console.error(`[mongodb] ${err}`);                    
                    if (req.erm.document.role == 'admin' && admins.length == 1) return res.json({ error: 'delete_last_admin' });
                    else return next();
                });                
            },
            postDelete: (req, res, next) => {
                if (req.erm.document && req.session.authenticated && req.session.authenticated.name == req.erm.document.name) {
                    delete req.session.authenticated;
                    return res.json({ error: 'logout' });
                }
                return next();
            },
            onError: (err, req, res, next) => {
                if (err && err.code == 11000) return res.json({ error: 'user_already_exists' });
                else return next();
            }
        });        

        restify.serve(router, Video, {
            idProperty: 'id',
            private: ['_id', '__v']
        });

        app.use(router);

        User.findOne({ role: 'admin' }, (err, user) => {
            if (err) console.error(`[mongodb] ${err}`);
            if (!user) {
                hashPassword('admin', (err, hash) => {
                    if (err) console.error(`[mongodb] ${err}`);
                    let newAdmin = new User({
                        name: 'admin',
                        password: hash,
                        role: 'admin',
                    });
                    newAdmin.save((err, result) => {
                        if (err) console.error(err);                        
                        console.log('[mongodb] created admin');
                    })
                });
            }
        });
    },
    disconnect: function(cb) {
        mongoose.disconnect(cb);
    }
}