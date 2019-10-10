var config = require('./../../config');
var db = config.database();
var allevents  =  require('./../../config/events');

module.exports = function apiRoutes(event) { 
var api = {};
api.getAllDepartments = function(req,res,next) {
    var sql = '';
    sql = "SELECT * FROM department where `isdelete`='n'";
    db.all(sql, function (err, rows) {
        if (err) {
            req.log.error(err);
            return next(err);
        }
        return res.send(rows);
    });

}
api.createNewDepartment = function(req,res,next) {
  var   sql = 'INSERT INTO department(`name`,`extras`) ' + 
    'VALUES (?, ?)';
    var data = [
        req.body.name,
        req.body.extras ? req.body.extras : null
    ];

    //req.log.debug(sql);
    db.run(sql, data, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
        event.emit(allevents.departmentUpdate);
        return res.status(200).json({ msg: 'Department Add Successfully' });
    });
}
api.deleteDeparment = function(req,res,next) {
    var sql = "UPDATE `department` SET `isdelete` = 'y' where rec_id=" + req.body.depId;
    db.run(sql, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
        event.emit(allevents.departmentUpdate);
        return res.status(200).json({ msg: 'Deparment Deleted successfully' });
    });
}
api.updateDepartment = function(req,res,next) {
    var sql = "UPDATE `department` SET `name` = '"+req.body.name+"' where rec_id=" + req.body.rec_id;
    db.run(sql, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
        event.emit(allevents.departmentUpdate);
        return res.status(200).json({ msg: 'Deparment Update successfully' });
    });
}
return api;
}


