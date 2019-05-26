var path = require('path');
var express = require('express');
var app=express();
var bodyParser = require('body-parser')
var passport = require('passport');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 
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
module.exports = app;
module.exports.passport = passport;
