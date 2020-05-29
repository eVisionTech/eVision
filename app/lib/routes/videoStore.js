module.exports = function (app) {
  app.get('/api/v1/Video/:id', (req, res, next) => {
    if (req.xhr) {
      let _videos = app.videos.filter((_node) => { return _node.id == req.params.id })[0];
      if (_videos) res.json(_videos.videos);
      else res.json([]);
    } else {
      res.redirect('/');
    }
  });
}
