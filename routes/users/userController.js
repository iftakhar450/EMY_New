var config = require('./../../config');
var db = config.database();

module.exports.getAllUser = function getAllUser(req, res) {
    var sql = '';
    if(req.body.status && req.body.status=='active') {
         sql = "SELECT * FROM users where `delete`='n' and `status`='active' ";
    } 
    else{
         sql = "SELECT * FROM users where `delete`='n'";
    }
    
    db.all(sql, function (err, rows) {
        if (err) {
            req.log.error(err);
            return next(err);
        }
        return res.send(rows);
    });

};
module.exports.createNewUser = function createNewUser(req, res) {
    console.log(req.body);

    sql = 'INSERT INTO users(`name`,`othername`, `eid`,`password`,`profession_id`,`department_id`,`isadmin`,`supervisor_id`,`mobile`,`home_mobile`,`isactive`,`isbouns_hour_apply`,`basic_salary`,`per_hour_rate`,`allowance_one`,`allowance_two`,`extras`) ' + 
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var data = [
        req.body.fullname,
        req.body.othername,
        req.body.eid,
        req.body.eid,  //password
        req.body.profession,
        req.body.department,
        req.body.isadmin,
        req.body.supervisor,
        req.body.mobileno,
        req.body.homemobile,
        req.body.isative,
        req.body.isBounsHourApplying,
        req.body.bsalary,
        req.body.hourrate,
        req.body.allowanceOne,
        req.body.allowanceTwo,
        req.body.extras ? req.body.extras : null
    ];

    //req.log.debug(sql);
    db.run(sql, data, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
        return res.status(200).json({ msg: 'user add successfully' });
    });

};
module.exports.deleteUser = function deleteUser(req, res) {

    var sql = "UPDATE `users` SET `delete` = 'y' where rec_id=" + req.body.userId;
    db.run(sql, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
        return res.status(200).json({ msg: 'user deleted successfully' });
    });
};
module.exports.updateUser = function updateUser(req, res) {

    return res.json({ msg: 'list off all deleteUser' });

};