module.exports = function (app, conf, save) {
    app.get('/api/v1/Settings', (req, res) => {
        let commonConf = {};
        for (let key in conf) {
            if (['nodes'].indexOf(key) == -1)
                commonConf[key] = conf[key];
        }
        res.jsonp(commonConf);
    });

    app.patch('/api/v1/Settings', (req, res) => {
        for (let key in req.body) conf[key] = req.body[key];
        save();
        if (process.platform === "win32" && process.send) process.send({ lang: conf["lang"] });
        res.jsonp({ success: true });
    });
}
