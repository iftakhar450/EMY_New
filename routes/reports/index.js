var express = require('express');
var router = express.Router();
var config = require('./../../config');
var db = config.database();
var jwt = require('jsonwebtoken');

module.exports = function apiRoutes() {

    var reportController = require('./reportController')();


    // authentication of user before calling the api
    var auth = function authMiddleware(req, res, next) {
        jwt.verify(req.headers['authorization'], 'emy@uae', function (err, decoded) {
            if (err) {
                return res.status(403).json({ error: 'Invalid Token' });
            }
            // console.log(decoded)
            // req.user = decoded.data

            next()
        });
        // var decoded = jwt.decode(req.headers['authorization']);
        // console.log(decoded);
        // jwt.verify(req.body.authorization, function(err, decoded) {
        //     console.log(decoded) // bar
        //     next();
        //   });
        // console.log(req.isAuthenticated());
        // if (!req.body.authorization || req.body.authorization == '') {
        //     return res.status(403).json({ msg: 'Invalid User' });
        // } else {
        //     var sql = '';
        //     sql = 'SELECT token FROM users_tokens where `token`="'+req.body.authorization+'"';
        //     db.all(sql, function (err, rows) {
        //         if (err) {
        //             req.log.error(err);
        //             return res.status(403).json({ msg: 'Invalid Token Provided' });
        //         }
        //         if(rows.length > 0) {
        //             next();
        //         }
        //         return res.status(403).json({ msg: 'Invalid User' })
        //     });

        // }

    };
    router.get('/', function (req, res) {
        res.send('reports is working');
    });
     router.post('/getMonthlySalaryData', auth, reportController.getDataFormMonthlySalaryReport);
     router.get('/getDashboardData', auth, reportController.getEmployeeDetail, reportController.getProjectDetail);

    return router;
}