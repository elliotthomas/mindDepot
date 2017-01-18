var express = require('express');
var router = express.Router();
var Passages = require('../models/passages.js');

router.get('/:id', function(req, res) {
    console.log('get route hit mang');
    console.log('req.params.id ->', req.params.id);
    Passages.find({ _id: req.params.id }, function(err, results) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(results);
        }
    }); // end get
}); //end router get


module.exports = router;
