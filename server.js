global.__base = __dirname + '/';
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var passport = require('passport');
var cors = require('cors')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Events = require('./events');
var events = new Events(io);
var port = normalizePort(process.env.PORT || '3000');
app.use(cors())
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


http.listen(port, function () {
    console.log('listening on *:3000');
});


// my sql connection
require('./config/database')().connect(function (err, connect) {
    if (err) {
        console.log("sql connection err", err);
    } else {
        console.log("sql db connected");
    }
});





// app.use(express.static(__dirname + '/dist/Emy-frontend-new'));
app.use(passport.initialize());

require('./config/passport')(passport);
require('./routes')(app, passport, events);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

app.use(express.static(path.join(__dirname, 'dist/Emy-frontend-new')));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, '/dist/Emy-frontend-new/index.html')); });
module.exports = app;
module.exports.passport = passport;
