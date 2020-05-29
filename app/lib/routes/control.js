module.exports = function (app, startNode, stopNode, restartNode) {
    app.post('/api/v1/Node/Start', (req, res) => {
        startNode(req.body, res.json.bind(res))
    });

    app.post('/api/v1/Node/Stop', (req, res) => {
        if (!req.body.id) return res.jsonp({ success: false, error: "parametr 'id' not found" })
        stopNode(req.body.id, res.json.bind(res));
    });
    
    app.post('/api/v1/Node/Restart', (req, res) => {
        if (!req.body.id) return res.jsonp({ success: false, error: "parametr 'id' not found" })
        restartNode(req.body, res.json.bind(res));
    });
}
