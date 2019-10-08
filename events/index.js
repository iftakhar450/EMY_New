/**
 * Created by shahzaib on 2/24/15.
 */

var events = require('events');
var Events = function (io) {
    var self = this;
    this.io = io;
    this.io.of('/main').on('connection', function (socket) {
        console.log('user connected');
        socket.on('subscribe', function (data) {
            console.log('socket subscribe');
            socket.join('1');
        });
        socket.on('disconnect', function () {
            console.log('socket disconnected');
        });
        socket.on('test', function (msg) {
            console.log('I received ', msg);
          });
    });
};
Events.prototype = Object.create(events.EventEmitter.prototype);
module.exports = Events;
