var express = require('express');
var router = express.Router();
var Passages = require('../models/passages.js');

router.delete('/:id', function(req, res){
  console.log('delete route hit');
  Passages.remove({_id: req.params.id},function(err){
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });// end remove
});//end router delete

module.exports = router;
