var express = require( 'express' );
var router = express.Router();
var path = require('path');
var Passage = require('../models/passages.js');

router.post('/', function(req, res){
  var title = req.body.title;
  var author = req.body.author;
  var sourceUrl = req.body.sourceUrl;
  var passage = req.body.passage;
  var imageUrl = req.body.imageUrl;

  console.log('image url', imageUrl);

  var newPassage = new Passage ({
    title: title,
    author: author,
    sourceUrl: sourceUrl,
    imageUrl: imageUrl,
    passage: passage,
    recited: 0,
    depot: false
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
