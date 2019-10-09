var jwt = require('jsonwebtoken');
module.exports = function (app, passport,event) {

    var attendence = require('./attendence');
    var users = require('./users');
    var projects = require('./projects');
    var settings = require('./settings')(event);
// console.log('000000000000000000000');
// console.log(event);

    app.post('/login', function (req, res, next) {
        console.log('req.body', req.body)
        next()
    }, passport.authenticate('local'), function (req, res) {
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        console.log('authenticated');
        req.user.token = jwt.sign({
            data: req.user
        }, 'emy@uae', { expiresIn: 60 * 60 });
        //console.log(req.user.username);
        //console.log(req.user.token);
        res.send(req.user);
    });

    app.use('/atn', attendence);
    app.use('/projects', projects);
    app.use('/users', users);
    app.use('/settings', settings);
    // catch 404 and forward to error handler
    // app.use(function (req, res, next) {
    //     var err = new Error('Not Found');
    //     err.status = 404;
    //     next(err);
    // });
    // production error handler
    // no stacktraces leaked to user
    // app.use(function (err, req, res, next) {
    //     res.status(err.status || 500);
    //     res.render('error', {
    //         message: err.message,
    //         error: {},
    //         partials: false
    //     });
    // });
}