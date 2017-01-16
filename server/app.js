var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('./strategies/userStrategy');

//require routers
var 
var userRouter = require ('./routes/user.js')


//middleware
app.use(bodyParser.json());
app.use(express.static(path.resolve('./server/public')));

app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

// server index file
app.get('/info', function(req, res) {
    res.send("hello from the server");
});

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

//set up server listening
app.listen(3000, function() {
  console.log("server running, check localhost:3000");
});

//set up MONGO DB
var mongoURI = "mongodb://localhost:27017/mindDepotDatabase";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});
