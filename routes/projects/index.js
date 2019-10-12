var express = require('express');
var router = express.Router();

module.exports = function apiRoutes(event) {
    router.get('/', function (req, res) {
        res.send('projects is working');
    });
    var projectController =require('./projectsController')(event);


    // authentication of user before calling the api
    var auth = function authMiddleware(req, res, next){
        // if (!req.isAuthenticated())
        // // res.send(401);
        //     return res.status(403).json({error: 'Invalid User'});
        // else
        //     next();
        // if (!req.body.token || req.body.token == '')
        // // res.send(401);
        // return res.status(403).json({ msg: 'Invalid User' });
        // else
            next();
    };
    router.post('/getAllProjects',auth,projectController.getAllProjects);
    
    router.post('/createProject',auth,projectController.createNewProject);
    router.post('/deleteProject',auth,projectController.deleteProject);
    router.post('/updateProject',auth,projectController.updateProject);

    return router;
}