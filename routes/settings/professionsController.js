var config = require('./../../config');
var db = config.database();
var config = require('./../../config');
var db = config.database();
module.exports = function apiRoutes(event) {
    var api = {};

   api.getAllProfession = function(req, res, next) {
        var sql = '';
        // if(req.body.status && req.body.status=='active') {
        //      sql = "SELECT * FROM department where `delete`='n' and `status`='active' ";
        // } 
        // else{
        //  sql = "SELECT * FROM department where `delete`='n'";
        // }
        sql = "SELECT * FROM profession where `isdelete`='n'";
        db.all(sql, function (err, rows) {
            if (err) {
                req.log.error(err);
                return next(err);
            }
            return res.send(rows);
        });
    
    };
    api.createNewProfession = function(req, res , next) {
        console.log(req.body);
    
        sql = 'INSERT INTO profession(`name`,`dep_id`,`extras`) ' +
            'VALUES (?, ?, ?)';
        var data = [
            req.body.name,
            req.body.depId ? req.body.depId : null,
            req.body.extras ? req.body.extras : null
        ];
    
        //req.log.debug(sql);
        db.run(sql, data, function (err) {
            if (err) {
                console.log(err);
                //  req.log.error(err);
                return res.status(500).json({ error: err });
            }
            return res.status(200).json({ msg: 'Department Add Successfully' });
        });
    
    };

    api.deleteProfession = function (req, res, next) {

        var sql = "UPDATE `profession` SET `isdelete` = 'y' where rec_id=" + req.body.depId;
        db.run(sql, function (err) {
            if (err) {
                console.log(err);
                //  req.log.error(err);
                return res.status(500).json({ error: err });
            }
            return res.status(200).json({ msg: 'Profession Deleted Successfully' });
        });
    };
    api.updateProfession = function (req, res, next) {
    
        var sql = "UPDATE `profession` SET `name` = '" + req.body.name + "' where rec_id=" + req.body.rec_id;
        db.run(sql, function (err) {
            if (err) {
                console.log(err);
                //  req.log.error(err);
                return res.status(500).json({ error: err });
            }
            return res.status(200).json({ msg: 'Profession Update successfully' });
        });
    };
    return api;
}


