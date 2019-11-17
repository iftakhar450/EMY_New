'use strict';

/**
 * mongodb connection config
 */
module.exports = {
    //mysql://bc032250518b90:4263e4b3@us-cdbr-iron-east-05.cleardb.net/heroku_3dbfaeedd580aea?reconnect=true
    // host: process.env.MYSQL_URI || "localhost",
    // user: process.env.MYSQL_USER || "root",
    // password: process.env.MYSQL_PASSWORD || "changeme",
    // database: process.env.MYSQL_DATABASE || "emy",
    host: process.env.MYSQL_URI || "us-cdbr-iron-east-05.cleardb.net",
    user: process.env.MYSQL_USER || "bc032250518b90",
    password: process.env.MYSQL_PASSWORD || "4263e4b3",
    database: process.env.MYSQL_DATABASE || "heroku_3dbfaeedd580aea",
    connectionLimit : 10,
};
