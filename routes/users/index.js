var express = require('express');
var router = express.Router();
var userController =require('./userController');


// authentication of user before calling the api
var auth = function authMiddleware(req, res, next){
    // if (!req.isAuthenticated())
    // // res.send(401);
    //     return res.status(403).json({error: 'Invalid User'});
    // else
    //     next();
    if (!req.body.token || req.body.token == '')
    // res.send(401);
    return res.status(403).json({ msg: 'Invalid User' });
    else
        next();
};
router.post('/getAllUser',auth,userController.getAllUser);

router.post('/createNewUser',auth,userController.createNewUser);
router.post('/deleteUser',auth,userController.deleteUser);
router.post('/updateUser',auth,userController.updateUser);
module.exports = router;