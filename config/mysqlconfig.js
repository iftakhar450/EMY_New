'use strict';

/**
 * mongodb connection config
 */
module.exports = {
    host: process.env.MYSQL_URI || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "changeme",
    database: process.env.MYSQL_DATABASE || "emy",
};
