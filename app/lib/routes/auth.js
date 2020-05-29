const path = require('path'),
    express = require('express'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    bodyParser = require('body-parser'),
    fs = require('fs-extra');

const User = require('../db/models/user')

var data_path = process.env.data_path || 'data';

var staticFolder = path.resolve(__dirname, '../../portal');
var dataFolder = data_path || path.resolve(__dirname, '../../portal');

module.exports = function (app, params) {

    app.use(cookieParser())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(methodOverride())

    app.use(cookieSession({
        secret: '00b2a1e6-eb0e-23e7-80c1-9a214cf093ae',
        cookie: { maxAge: 24 * 60 * 60 * 1000 }
    }));

    app.get('/', (req, res, next) => {
        if (!req.session.authenticated)
            return res.redirect('/login.html');
        next();
    });

    app.get('/js/login.js', (req, res, next) => {
        fs.readFile(path.resolve(staticFolder, 'js', 'login.js'), 'utf8', (err, data) => {
            if (err) console.error(err);
            res.send('window.lang = "' + params.lang + '"; window.theme = "' + params.theme + '";' + data);
        })
    });

    app.use(express.static(staticFolder));
    app.use(express.static(dataFolder));

    app.use((req, res, next) => {
        req.session.tries = req.session.tries || 0;
        req.session.timeout = req.session.timeout || null;
        next();
    })

    app.get('/api/v1/Login', (req, res) => {
        User.getAuthenticated(req.query.username, req.query.password, (err, user) => {
            if (err) console.error(err);          
           
            if (req.session.timeout) {
                return res.json({ success: false, message: 'no_tries', timeout: req.session.timeout });
            } else if (!user) {
                req.session.tries++;
                if (req.session.tries > 2) {
                    req.session.timeout = new Date();
                    req.session.timeout.setMinutes(req.session.timeout.getMinutes() + 30);
                    setTimeout(function () {
                        req.session.timeout = null;
                    }, 30 * 60 * 1000);
                    return res.json({ success: false, message: 'no_tries', timeout: req.session.timeout });
                }
                return res.json({ success: false, message: 'login_fail', tries: (3 - req.session.tries) });
            } else {
                req.session.authenticated = user;
                req.session.tries = 0;
                req.session.timeout = null;
                return res.json({ success: true });
            }
        });
    });

    app.get('/api/v1/Status', (req, res) => {
        if (!req.session.authenticated) return res.json({ success: false });
        else return res.json({ success: true, name: req.session.authenticated.name, role: req.session.authenticated.role });
    });

    app.get('/api/v1/Logout', function (req, res, next) {
        delete req.session.authenticated;
        res.redirect('/');
    });

    app.use(function (req, res, next) {       
        console.log(req.method, req.path, 
            Object.entries(req.query).length === 0 ? '': JSON.stringify(req.query), 
            Object.entries(req.body).length === 0 ? '': JSON.stringify(req.body));
    
        if (req.session.authenticated) {
            if (req.session.authenticated.role == 'user' && req.method != 'GET')
                return res.json({
                    success: false,
                    msg: "Role authentication failed"
                });
            else next();
        } else {
            return res.redirect('/');
        }
    });

    app.post('/api/v1/Restart', function (req, res, next) {
        res.json({ success:true });
        setTimeout(function () { process.emit('exit') }, 0);
    });
}
