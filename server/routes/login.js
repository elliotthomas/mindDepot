var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/', passport.authenticate('local'), function(req, res) {
  res.sendStatus(200);
});

router.get('/test', function(req, res) {
  console.log('hit test route');
  console.log('req.user', req.user);
  console.log('req.session', req.session);

  console.log('is authed?', req.isAuthenticated());

  res.sendStatus(200);
});

module.exports = router;
