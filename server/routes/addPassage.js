var express = require( 'express' );
var router = express.Router();
var path = require('path');
var Passage = require('../models/passages.js');

router.post('/', function(req, res){

  var newPassage = new Passage ({
    description: description,
    placer: placer,
    img_url: img_url
  });
  newItem.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }//end else
  });//end save
});//end post

module.exports = router;
