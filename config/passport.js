// Login handler 

var LocalStrategy = require('passport-local').Strategy;
// var LdapStrategy   = require('passport-ldapauth');
var db = require('./database')();
// var crypto = require('crypto'),
//     algorithm = 'aes-256-ctr',
//     password = 'd6F3Efeq';

// function encrypt (text){
//   var cipher = crypto.createCipher(algorithm,password);
//   var crypted = cipher.update(text,'utf8','hex');
//   crypted += cipher.final('hex');
//   return crypted;
// }

// function decrypt (text){
//   var decipher = crypto.createDecipher(algorithm,password);
//   var dec = decipher.update(text,'hex','utf8');
//   dec += decipher.final('utf8');
//   return dec;
// }



// connection.query('USE ' + dbconfig.database);
module.exports = function (passport) {
    passport.use('local', new LocalStrategy({ passReqToCallback: true },
        function (req, username, password, done) {

            //   db.all("SELECT * FROM users WHERE username = '"+username+"' AND endeffdt IS NULL", function(err, rows){
            db.all("SELECT * FROM users WHERE username = '" + username + "'", function (err, rows) {
                if (err) {
                    return done(err);
                }
                console.log('rowwwwwwwwwwwwwwwwwwww');
                console.log(rows[0]);
                if (!rows.length) {
                    return done(null, false, "Failed");
                }
                if (rows[0].password != password) {

                    return done(null, false, "Failed");
                }
               return done(null, rows[0]);
            });

            // if (username === "admin" && password === "admin")
            //   return done(null, {name: "admin"});

            // return done(null, false, "Failed");
        }
    ));





    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};