var express = require('express');
var router = express.Router();
var logout = require('express-passport-logout');


router.get('/logout', logout());

module.exports = router;
