module.exports = function (app, passport) {

        var attendence = require('./attendence');
        var users = require('./users');
        var projects = require('./projects');


        
         app.use('/atn', attendence);
        app.use('/projects', projects);
        app.use('/users', users);
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