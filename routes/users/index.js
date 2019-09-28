var express = require('express');
var router = express.Router();
var userController =require('./userController');


// authentication of user before calling the api
var auth = function authMiddleware(req, res, next){
    console.log('00000');
    if (!req.isAuthenticated())
    // res.send(401);
        return res.status(403).json({error: 'Invalid User'});
    else
        next();
};
router.post('/getAllUser',userController.getAllUser);

router.post('/createNewUser',userController.createNewUser);
router.post('/deleteUser',userController.deleteUser);
router.post('/updateUser',userController.updateUser);
module.exports = router;