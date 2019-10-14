var express = require('express');
var router = express.Router();
var config = require('./../../config');
var db = config.database();
module.exports = function apiRoutes(event) {

    var projectController = require('./projectsController')(event);


    // authentication of user before calling the api
    var auth = function authMiddleware(req, res, next) {
        if (!req.body.authorization || req.body.authorization == '') {
            return res.status(403).json({ msg: 'Invalid User' });
        } else {
            var sql = '';
            sql = 'SELECT token FROM users_tokens where `token`="'+req.body.authorization+'"';
            db.all(sql, function (err, rows) {
                if (err) {
                    req.log.error(err);
                    return res.status(403).json({ msg: 'Invalid Token Provided' });
                }
                if(rows.length > 0) {
                    next();
                }
                return res.status(403).json({ msg: 'Invalid User' })
            });

        }
    };
    router.get('/', auth, function (req, res) {
        res.send('projects is working');
    });
    router.post('/getAllProjects', auth, projectController.getAllProjects);

    router.post('/createProject', auth, projectController.createNewProject);
    router.post('/deleteProject', auth, projectController.deleteProject);
    router.post('/updateProject', auth, projectController.updateProject);

    return router;
}