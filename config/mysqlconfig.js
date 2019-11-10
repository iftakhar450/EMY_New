'use strict';

/**
 * mongodb connection config
 */
module.exports = {
    //mysql://bfa8ab275f223a:61311f5e@us-cdbr-iron-east-05.cleardb.net/heroku_a252573ffce18d2?reconnect=true
    // host: process.env.MYSQL_URI || "localhost",
    // user: process.env.MYSQL_USER || "root",
    // password: process.env.MYSQL_PASSWORD || "changeme",
    // database: process.env.MYSQL_DATABASE || "emy",
    host: process.env.MYSQL_URI || "us-cdbr-iron-east-05.cleardb.net",
    user: process.env.MYSQL_USER || "bfa8ab275f223a",
    password: process.env.MYSQL_PASSWORD || "61311f5e",
    database: process.env.MYSQL_DATABASE || "heroku_a252573ffce18d2",
    supportBigNumbers:true, //true/false
		debug:['ComQueryPacket'], //false or array of node-mysql debug options
		trace:true //true/false
};
