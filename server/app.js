var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('./strategies/userStrategy');


//require routers
var addPassageRouter = require ('./routes/addPassage.js');
var getPassageRouter = require ('./routes/getPassages.js');
var getPassageByIDRouter = require ('./routes/getPassageByID.js');
var addCounterRouter = require ('./routes/addCounter.js');
var deletePassageRouter = require ('./routes/deletePassage.js');
var addToDepotRouter = require('./routes/addToDepot.js');
var registerRouter = require('./routes/register.js');
var loginRouter = require('./routes/login.js');
var logoutRouter = require('./routes/logout.js');
var returnToPracticeRouter = require('./routes/returnToPractice.js');
var addStatsRouter = require('./routes/addStats.js');



//middleware
app.use(bodyParser.json());
app.use(express.static(path.resolve('./server/public')));

app.use(session({
  secret: 'my secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

//Routers
app.use('/addPassage', addPassageRouter);
app.use('/getPassages', getPassageRouter);
app.use('/getPassageByID', getPassageByIDRouter);
app.use('/addCounter', addCounterRouter);
app.use('/deletePassage', deletePassageRouter);
app.use('/addToDepot', addToDepotRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/returnToPractice', returnToPracticeRouter);
app.use('/addStats', addStatsRouter);




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
