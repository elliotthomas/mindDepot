var express = require('express');
var router = express.Router();
var Passages = require('../models/passages.js');

router.put('/', function(req, res) {
    console.log('put route hit mang');
    console.log('req.body ->', req.body);
    Passages.update({ _id: req.body.idToSend }, { $set: {'recited': req.body.counter }}, function(err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(results);
        }
    });
}); //end router put

module.exports = router;
