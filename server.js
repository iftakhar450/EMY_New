var path = require('path');
var express = require('express');
var app=express();
var bodyParser = require('body-parser')
var passport = require('passport');
var cors = require('cors')
 
app.use(cors())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
//  var Events = require('./events');
//  var events = new Events(io);
// my sql connection
require('./config/database')().connect(function (err, connect) {
    if (err) {
        console.log("sql connection err", err);
    }else{
        console.log("sql db connected");
    }
});
require('./config/passport')(passport);


app.use(express.static(__dirname + '/public'));  
app.use(passport.initialize());           
module.exports = app;
module.exports.passport = passport;
