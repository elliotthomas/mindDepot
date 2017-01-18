var express = require( 'express' );
var router = express.Router();
var path = require('path');
var Passage = require('../models/passages.js');

router.post('/', function(req, res){
  var title = req.body.title;
  var author = req.body.author;
  var sourceUrl = req.body.sourceUrl;
  var passage = req.body.passage;

  var newPassage = new Passage ({
    title: title,
    author: author,
    sourceUrl: sourceUrl,
    passage: passage,
    recited: 0
  });
  newPassage.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }//end else
  });//end save
});//end post

module.exports = router;
