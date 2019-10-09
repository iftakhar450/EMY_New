/**
 * Created by shahzaib on 2/24/15.
 */

var events = require('events');
var socket = require('../config/sockets');
 var allevents  = require('../config/events');

var Events = function (io) {
    var self = this;
    this.io = io;
   
    this.io.of(socket.socket_main).on('connection', function (socket) {
        console.log('user connected');
        socket.on('subscribe', function (data) {
            console.log('socket subscribe');
            socket.join('1');
        });
        socket.on('disconnect', function () {
            console.log('socket disconnected');
        });
        
    });

    this.on(allevents.departmentUpdate, function () {
        self.io.of(socket.socket_main).emit(allevents.departmentUpdate);
    });
};
Events.prototype = Object.create(events.EventEmitter.prototype);
module.exports = Events;
