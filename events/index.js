/**
 * Created by shahzaib on 2/24/15.
 */

var events = require('events');
var socket = require('../config/sockets');
var allevents = require('../config/events');

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
    // department update
    this.on(allevents.departmentUpdate, function () {
        self.io.of(socket.socket_main).emit(allevents.departmentUpdate);
    });
    // employees update
    this.on(allevents.empUpdate, function () {
        self.io.of(socket.socket_main).emit(allevents.empUpdate);
    });
      // worknature update
      this.on(allevents.workNatureUpdate, function () {
        self.io.of(socket.socket_main).emit(allevents.workNatureUpdate);
    });
     // project update
     this.on(allevents.projectUpdate, function () {
        self.io.of(socket.socket_main).emit(allevents.projectUpdate);
    });


};
Events.prototype = Object.create(events.EventEmitter.prototype);
module.exports = Events;
