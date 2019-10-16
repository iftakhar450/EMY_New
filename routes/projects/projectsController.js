var config = require('./../../config');
var db = config.database();
var allevents = require('./../../config/events');
var moment = require('moment');
module.exports = function apiRoutes(event) {
    var api = {};
    api.getAllProjects = function (req, res, next) {
        var sql = '';
        sql = "SELECT * FROM projects where `isdelete`='n'";
        db.all(sql, function (err, rows) {
            if (err) {
                req.log.error(err);
                return next(err);
            }
            return res.send(rows);
        });

    }
    api.createNewProject = function (req, res, next) {
        var sdate = moment(req.body.startDate).format("YYYY-MM-DD HH:MM:SS");
        var edate = moment(req.body.endDate).format("YYYY-MM-DD HH:MM:SS");
        //   console.log(date);
        var sql = 'INSERT INTO projects(`sid`,`name`,`status`,`translation`,`area`,`location`,`startDate`,`endDate`, `extras`) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        var data = [
            req.body.sid,
            req.body.fullname,
            req.body.status,
            req.body.othername,
            req.body.area,
            req.body.location,
            sdate,
            edate,
            req.body.extras ? req.body.extras : null
        ];
        // console.log(sql)
        //req.log.debug(sql);
        db.run(sql, data, function (err) {
            if (err) {
                console.log(err);
                //  req.log.error(err);
                return res.status(500).json({ error: err });
            }
            event.emit(allevents.departmentUpdate);
            return res.status(200).json({ msg: 'Project Add Successfully' });
        });
    }
    api.deleteProject = function (req, res, next) {
        var sql = "UPDATE `projects` SET `isdelete` = 'y' where rec_id=" + req.body.depId;
        db.run(sql, function (err) {
            if (err) {
                console.log(err);
                //  req.log.error(err);
                return res.status(500).json({ error: err });
            }
            event.emit(allevents.departmentUpdate);
            return res.status(200).json({ msg: 'Project Deleted successfully' });
        });
    }
    api.updateProject = function (req, res, next) {
        // var sql = 'UPDATE projects SET status="hold" WHERE tokens.token_no="' + token + '" AND tokens.status="process" ' +
        //     'AND tokens.counter_id=' + req.counter.id;
        if(req.body.extras) {
            var sql = 'UPDATE `projects` SET `sid` = "' + req.body.sid + '", `name` = "' + req.body.fullname + '" ' +
            ', `status` = "' + req.body.status + '" `translation` = "' + req.body.othername + '" ' +
            ', `area` = "' + req.body.area + '", `location` = "' + req.body.location + '" ' +
            ', `startDate` = "' + req.body.startDate + '", `endDate` = "' + req.body.endDate + '" ' +
            ', `extras` = "' + req.body.extras + '" where rec_id=' + req.body.rec_id;
        } else {
            var sql = 'UPDATE `projects` SET `sid` = "' + req.body.sid + '", `name` = "' + req.body.fullname + '" ' +
            ', `status` = "' + req.body.status + '" `translation` = "' + req.body.othername + '" ' +
            // ', `area` = "' + req.body.area + '", `location` = "' + req.body.location + '" ' +
            // ', `startDate` = "' + req.body.startDate + '", `endDate` = "' + req.body.endDate + '" ' +
            'where rec_id=' + req.body.rec_id;
        }
      
        console.log(sql);
        db.run(sql, function (err) {
            if (err) {
                console.log(err);
                //  req.log.error(err);
                return res.status(500).json({ error: err });
            }
            event.emit(allevents.departmentUpdate);
            return res.status(200).json({ msg: 'Project Update successfully' });
        });
    }
    return api;
}


