var express = require('express');
var router = express.Router();
var Passages = require('../models/passages.js');

router.get('/', function(req, res) {
  console.log('get route hit dude');
  Passages.find({}, function(err, results) {
    if (err) {
      res.sendStatus(500);
    } else {
      // console.log('req.body ->', results);
      var memorized = [];
      results.forEach(function (passage){
        if (passage.depot == true){
          memorized.push (passage)
        } else{
          return
        }
        })

        

      var passageToSend = [];
      var objectToSend = {
        passageToSend: passageToSend,
        userToSend: req.user,
        memorized: memorized
      }
      var userIn = req.user.username;
      results.forEach(function (passage){
        // console.log('passage user', passage.user);
        // console.log('userIN', userIn);
        if (passage.user == userIn){
          passageToSend.push (passage)
        } else {
          // console.log("no user");
        }
      })
      // console.log('object to send', objectToSend);
      res.send(objectToSend);
    }
  });
}); // end get

module.exports = router;
