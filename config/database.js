/**
 * Created by shahzaib on 12/8/14.
 */

// var sqlite3 = require('sqlite3');


// var conn = function () {
//     return new sqlite3.Database(__base + 'PixlhiveEng-v4.db');
// };


var mysql = require('mysql');
var fs = require('fs');
const importer = require('node-mysql-importer')
var config = require('./mysqlconfig');
var con = mysql.createConnection(config);
console.log(config);
console.log(con)
var DbManager = function () {
    var sql_adpt = {};
    var importsql = function (callback) {
        var tempcont = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            multipleStatements: true
        })
        tempcont.query('CREATE DATABASE ' + config.database, function (error, results, fields) {
            if (error) {
                console.log('error at database creation');
                console.log(error);
                callback(error);
            } else {
                importer.config(config)

                importer.importSQL('./emy.sql').then(() => {
                    tempcont.destroy();
                    con = mysql.createConnection(config);
                    console.log('all statements have been executed')
                }).catch(err => {
                    console.log(`error: ${err}`)
                })
            }
        });
    }

    sql_adpt.connect = function (callback) {

        if (con.state == "disconnected") {
            con = mysql.createConnection(config);
            con.connect(function (err) {
                if (err) {
                    console.log('create connection error')
                    console.log(err)
                    if (err.errno == 1049) {
                        con.destroy();
                        importsql(callback);

                    } else {
                        console.log('0000000000000000000');
                        console.log(err);
                        // callback(err);
                        process.exit(1)
                    }

                } else {
                    console.log("Connected!");
                    callback(null, con);
                }
            });
            con.on('error', function (err) {
                console.log('--------------------mysql error--------------');
                console.log('db error', err);
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    con = mysql.createConnection(config);
                    con.connect();
                } else {
                    throw err;
                }
            });
        } else {

            callback(null, con);
        }
    }

    sql_adpt.all = function (query, callback) {
        sql_adpt.connect(function (err, db) {
            if (err) {
                console.log("query executed", query);
                return callback(err, null);
            }
            db.query(query, function (err, result, fields) {
                if (!err) {
                    return callback(null, result);
                } else {
                    return callback(err, null);
                }

            });
        });
    }

    sql_adpt.run = function (query, data, callback) {

        var check_callback;
        if (callback) {
            check_callback = callback;
        } else {
            check_callback = data;
        }
        sql_adpt.connect(function (err, db) {
            if (err) {
                return check_callback(err, null);
            } else {
                if (callback) {
                    var value = [];
                    var column = [];
                    data.forEach(obj => {
                        var checkNull = obj ? "'" + obj + "'" : null;
                        query = query.replace(/[?]/, checkNull);
                    });
                }


                db.query(query, function (err, result, fields) {
                    if (err) {
                        return check_callback(err, null);
                    } else {
                        return check_callback(null, result.insertId);
                    }
                });
            }

        });
    }



    sql_adpt.each = function (query, callback) {
        sql_adpt.connect(function (err, db) {
            if (err) {
                return callback(err, null);
            } else {

                db.query(query, function (err, result, fields) {

                    if (err) {
                        console.log("query executed sqlitedb.js", query);
                        console.log("err from query", err);
                        return callback(err, null);
                    } else {
                        var output = null;
                        if (result.length) {
                            output = result[0]
                        }
                        return callback(null, output);
                    }
                });
            }

        });
    }

    return sql_adpt
}


module.exports = DbManager;