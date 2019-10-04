var config = require('./../../config');
var db = config.database();

module.exports.getAllDepartments = function getAllDepartments(req, res) {
    var sql = '';
    // if(req.body.status && req.body.status=='active') {
    //      sql = "SELECT * FROM department where `delete`='n' and `status`='active' ";
    // } 
    // else{
        //  sql = "SELECT * FROM department where `delete`='n'";
    // }
    sql = "SELECT * FROM department where `delete`='n'";
    db.all(sql, function (err, rows) {
        if (err) {
            req.log.error(err);
            return next(err);
        }
        return res.send(rows);
    });

};
module.exports.createNewDepartment = function createNewDeparment(req, res) {
    console.log(req.body);

    sql = 'INSERT INTO department(`name`,`extras`) ' + 
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
        return res.status(200).json({ msg: 'Department Add Successfully' });
    });

};
module.exports.deleteDeparment = function deleteDeparment(req, res) {

    var sql = "UPDATE `department` SET `delete` = 'y' where rec_id=" + req.body.depId;
    db.run(sql, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
        return res.status(200).json({ msg: 'Deparment Deleted successfully' });
    });
};
module.exports.updateDepartment = function updateDepartment(req, res) {
    var sql = "UPDATE `department` SET `name` = '"+req.body.name+"' where rec_id=" + req.body.rec_id;
    db.run(sql, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
        return res.status(200).json({ msg: 'Deparment Update successfully' });
    });

};