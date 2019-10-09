var express = require('express');
var router = express.Router();


module.exports = function apiRoutes(event) {
var depController = require('./departmentController')(event);
var professionController = require('./professionsController')(event);
// var occupy=require('./occupy')(event)
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

router.get('/', function (req, res) {
    res.send('settings is working');
});
// department routes
router.get('/getAllDepartments',auth,depController.getAllDepartments);
router.post('/addDepartment', auth, depController.createNewDepartment);
router.post('/deleteDepartment',auth, depController.deleteDeparment);
router.post('/updateDepartment',auth, depController.updateDepartment);

// profession routes
router.get('/getAllProfession',auth, professionController.getAllProfession);
router.post('/addProfession',auth, professionController.createNewProfession);
router.post('/deleteProfession',auth, professionController.deleteProfession);
router.post('/updateProfession',auth, professionController.updateProfession);

return router
};
// module.exports = router;