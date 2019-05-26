var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('attendence is working');
});

module.exports = router;