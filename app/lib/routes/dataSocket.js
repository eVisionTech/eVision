const WebSocket = require('ws');
const url = require('url')

module.exports = function (app, conf = {}) {
  const wss = new WebSocket.Server({ port: conf.detectorPort || 3002 });

  function onMessage(message) {
    try {
      let obj = JSON.parse(message);
      if (obj.action == 'init') {
        console.log(obj);
        this.send(JSON.stringify({ action: 'start', data: conf.nodes.filter(function (item) { return (item.id == obj.node_id) })[0] }));
      }
      return true;
    } catch (e) {
      console.error(e);
      return false
    }
  }

  function onConnection(ws, req) {
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let id = query.id;

    if (!id) {
      ws.send('Url parametr "key" not found!');
      return ws.close();
    }

    ws.send(JSON.stringify({ action: 'start', data: conf.nodes.filter(function (item) { return (item.id == id) })[0] }));

    ws.on('message', onMessage);
  }

  wss.on('connection', onConnection);
  return wss;
}