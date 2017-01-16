var express = require('express');
var router = express.Router();
var User = require('../models/user.js')

//get all users from the database
router.get ('/', function(req,res){
console.log('In get route hit, user');

});//end get

module.exports = router
