var express = require('express');
var router = express.Router();
var Passages = require('../models/passages.js');

router.get('/', function(req, res) {
  console.log('get route hit dude');
  console.log('req,user', req.user);
  Passages.find({}, function(err, results) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
}); // end get

module.exports = router;
