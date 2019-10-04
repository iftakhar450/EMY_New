var config = require('./../../config');
var db = config.database();
var config = require('./../../config');
var db = config.database();

module.exports.getAllProfession = function getAllProfession(req, res) {
    var sql = '';
    // if(req.body.status && req.body.status=='active') {
    //      sql = "SELECT * FROM department where `delete`='n' and `status`='active' ";
    // } 
    // else{
        //  sql = "SELECT * FROM department where `delete`='n'";
    // }
    sql = "SELECT * FROM profession where `delete`='n'";
    db.all(sql, function (err, rows) {
        if (err) {
            req.log.error(err);
            return next(err);
        }
        return res.send(rows);
    });

};
module.exports.createNewProfession = function createNewProfession(req, res) {
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
module.exports.deleteProfession = function deleteProfession(req, res) {

    var sql = "UPDATE `profession` SET `delete` = 'y' where rec_id=" + req.body.depId;
    db.run(sql, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
        return res.status(200).json({ msg: 'Profession Deleted Successfully' });
    });
};
module.exports.updateProfession = function updateProfession(req, res) {

    var sql = "UPDATE `profession` SET `name` = '"+req.body.name+"' where rec_id=" + req.body.rec_id;
    db.run(sql, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
        return res.status(200).json({ msg: 'Profession Update successfully' });
    });
};