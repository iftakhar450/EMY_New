var config = require('./../../config');
var db = config.database();
var allevents = require('./../../config/events');
module.exports = function apiRoutes(event) {
    var api = {};
    api.getAllUser = function (req, res, next) {
        var sql = '';
        if (req.body.status && req.body.status == 'active') {
            sql = "SELECT * FROM users where `isdelete`='n' and `status`='active' ";
        }
        else {
            // sql = "SELECT users.*,department.name as depName, profession.name as profName \
            // FROM users LEFT JOIN department ON department.rec_id = users.department_id \
            // LEFT JOIN profession ON profession.rec_id = users.profession_id \
            // where users.isdelete = 'n'";
            
            sql = "SELECT users.*,department.name as depName, profession.name as profName, \
          GROUP_CONCAT(projects.sid ,'-',projects.name) as projects  FROM users\
            LEFT JOIN department ON department.rec_id = users.department_id \
            LEFT JOIN profession ON profession.rec_id = users.profession_id\
            LEFT JOIN projects ON FIND_IN_SET(projects.rec_id, users.project_ids) != 0\
            where users.isdelete = 'n'\
            group by users.rec_id"
            //  sql = "SELECT * FROM users where `isdelete`='n'";
        }

        db.all(sql, function (err, rows) {
            if (err) {
                //  req.log.error(err);
                return next(err);
            }
            return res.send(rows);
        });

    }
    api.createNewUser = function (req, res, next) {
        console.log(req.body);

        // sql = 'INSERT INTO users(`name`,`othername`, `eid`,`password`,`profession_id`,`department_id`,`isadmin`,`supervisor_id`,`mobile`,`home_mobile`,`isactive`,`isbouns_hour_apply`,`basic_salary`,`per_hour_rate`,`allowance_one`,`allowance_two`,`project_ids`,`extras`) ' +
        //     'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        sql = 'INSERT INTO users(`name`,`othername`, `eid`,`password`,`profession_id`,\
        `department_id`,`isadmin`,`supervisor_id`,`mobile`,`home_mobile`,`isactive`,\
        `isbouns_hour_apply`,`basic_salary`,`per_hour_rate`,`allowance_one`,`allowance_two`,\
        `project_ids`,`extras`) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
            req.body.projects ? req.body.projects : null,
            req.body.extras ? req.body.extras : null
        ];

        //req.log.debug(sql);
        db.run(sql, data, function (err) {
            if (err) {
                if (err.sqlMessage) {
                    return res.status(500).json({ msg: err.sqlMessage });
                } else {
                    return res.status(500).json({ error: err });
                }
            }
            return res.status(200).json({ msg: 'user add successfully' });
        });
    }
    api.deleteUser = function (req, res, next) {
        var sql = "UPDATE `users` SET `isdelete` = 'y' where rec_id=" + req.body.userId;
        db.run(sql, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err });
            }
            event.emit(allevents.departmentUpdate);
            return res.status(200).json({ msg: 'user deleted successfully' });
        });
    }
    api.updateUser = function (req, res, next) {
        var sql = 'UPDATE `users` SET `eid` = "' + req.body.eid + '", `name` = "' + req.body.fullname + '" ' +
            ',`othername` = "' + req.body.othername + '" , `profession_id` = "' + req.body.profession + '"' +
            ', `department_id` = "' + req.body.department + '", `isadmin` = "' + req.body.isadmin + '" ' +
            ', `supervisor_id` = "' + req.body.supervisor + '", `mobile` = "' + req.body.mobileno + '" ' +
            ', `home_mobile` = "' + req.body.homemobile + '",`isactive` = "' + req.body.isative + '"' +
            ', `isbouns_hour_apply` = "' + req.body.isBounsHourApplying + '", `basic_salary` = "' + req.body.bsalary + '"' +
            ', `per_hour_rate` = "' + req.body.hourrate + '", `allowance_one` = "' + req.body.allowanceOne + '"' +
            ', `allowance_two` = "' + req.body.allowanceTwo + '" , `project_ids` = "' + req.body.projects + '"';

        if (req.body.extras) {
            sql += ', `extras` = "' + req.body.extras + '"';
        }
        sql += 'where rec_id=' + req.body.rec_id;

        db.run(sql, function (err) {
            if (err) {
                console.log(err);
                //  req.log.error(err);
                return res.status(500).json({ error: err });
            }
            event.emit(allevents.departmentUpdate);
            return res.status(200).json({ msg: 'Users Update successfully' });
        });
    }
    return api;
}