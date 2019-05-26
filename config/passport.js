// Login handler 

var LocalStrategy   = require('passport-local').Strategy;
// var LdapStrategy   = require('passport-ldapauth');
var db = require('./database');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
 
function encrypt (text){
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt (text){
  var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

var OPTS = {
    server: {
        url: process.env.LDAP_HOST || 'ldap://127.0.0.1:389',
        bindDN: process.env.LDAP_BINDDN || 'cn=admin,dc=queaxis,dc=com',
        bindCredentials: process.env.LDAP_PASSWD || 'changeme',
        searchBase: process.env.LDAP_SEARCH_BASE || 'ou=users,dc=queaxis,dc=com',
        searchFilter: process.env.LDAP_SEARCH_FILTER || '(uid={{username}})'
    },
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}

// connection.query('USE ' + dbconfig.database);
module.exports = function(passport) {

    // passport.use('ldapauth', new LdapStrategy(OPTS, function(req, user, done) {
        passport.use('ldapauth', new LocalStrategy(OPTS, function(req, user, done) {
    db.query("SELECT * FROM users WHERE username = '"+user.uid+"' AND endeffdt IS NULL", function(err, rows) {
            if (err) {
                return done(err);
            }
            if (!rows.length) {
                var newUser = {
                    name: user['cn'],
                    username: user['uid'],
                    password: 'password',
                    active: 'y',
                    date_added: new Date(),
                    created_by: '1'
                };
                
                db.insert('users', newUser, function (err, insertId) {
                    if (err) return done(err);
                    db.query("SELECT * FROM users WHERE rec_id="+insertId+" AND endeffdt IS NULL", function (err, rows) {
                        if (err) return done(err);
                        return done(null, rows[0]);
                    });
                });
            }
            else {
                return done(null, rows[0]);
            }
        });
    }));

    passport.use('local', new LocalStrategy({passReqToCallback: true},
      function(req,username, password, done) {

          db.query("SELECT * FROM users WHERE username = '"+username+"' AND endeffdt IS NULL", function(err, rows){
            if (err) {
                return done(err);
            }
            if (!rows.length) {
                return done(null, false, "Failed");
            }
            console.log(rows[0]);
             if (rows[0].password!=password) {

                return done(null, false, "Failed");
            }
            return done(null, rows[0]);
          });

        // if (username === "admin" && password === "admin")
        //   return done(null, {name: "admin"});

        // return done(null, false, "Failed");
      }
    ));

    passport.use('local-counter', new LocalStrategy({passReqToCallback: true},
        function(req,username, password, done) {

            db.query("SELECT * FROM users WHERE username = "+username+" AND endeffdt IS NULL", function(err, rows){
                if (err) {
                    return done(err);
                }
                if (!rows.length) {
                    return done(null, false, "Failed");
                }
                console.log(rows[0]);
                if (rows[0].password!=password) {

                    return done(null, false, "Failed");
                }
                console.log('password matched');
                var sql = 'SELECT counters.* from user_counters inner join counters on counters.rec_id=user_counters.counters_id where user_id=' + rows[0].rec_id;
                console.log(sql);
                db.query(sql, function (err, counters) {
                    if (err) return done(err);
                    if (!counters.length > 0) {
                        console.log('Authorized to all counters');
                        return done(null, rows[0]);
                    }
                    else {
                        console.log('checking counters');
                        console.log(counters);
                        var match = false;
                        counters.forEach(function (obj) {
                            if (obj.cnumber == req.query.counter) {
                                console.log('counter matched');
                                match = true;
                            }
                        });
                        if (match) {
                            return done(null, rows[0]);
                        }
                        else {
                            return done(null, false, 'Counter did not match');
                        }
                    }
                });
                //return done(null, rows[0]);
            });

            // if (username === "admin" && password === "admin")
            //   return done(null, {name: "admin"});

            // return done(null, false, "Failed");
        }
    ));



    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};