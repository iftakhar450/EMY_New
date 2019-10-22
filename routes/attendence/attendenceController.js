var config = require('./../../config');
var db = config.database();
var allevents = require('./../../config/events');
var moment = require('moment');
module.exports = function apiRoutes(event) {
    var api = {};
    api.getAttendenceBydate = function (req, res, next) {
        var adate = moment(req.body.date).format('YYYY-MM-DD');
        var sql = '';
        sql = "SELECT * FROM attendence where  `added_date`>= '"+adate+"' AND `added_date` <= '"+adate+"'";
        db.all(sql, function (err, rows) {
            if (err) {
                req.log.error(err);
                return next(err);
            }
            return res.send(rows);
        });

    }
    api.checkattendenceExsist = function (req, res, next) {
        var adate = moment(req.body.date).format('YYYY-MM-DD');
        var sql = '';
        sql = "SELECT * FROM attendence where `user_id`= '" + req.body.uid + "' && `added_date` = '" + adate + "'";
        db.all(sql, function (err, rows) {
            if (err) {
                req.log.error(err);
                return next(err);
            }
            if (rows.length > 0) {
                return res.status(500).json({ msg: 'Record Already exsist' })
                // return res.send({ msg: 'Record Already exsist' });
            } else {
                next();
            }
            // return res.send(rows);
        });
    }
    api.createNewAttendence = function (req, res, next) {
        var adate = moment(req.body.date).format('YYYY-MM-DD');
        var sql = 'INSERT INTO attendence(`user_id`,`project_id`,`overtime`,`supervisor_id`,`work_id`,`added_date`, `status`) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?)';
        var data = [
            req.body.uid,
            req.body.pid,
            req.body.overtime,
            req.body.added_by,
            req.body.wid,
            adate,
            req.body.status,
        ];
        // console.log(sql)
        db.run(sql, data, function (err) {
            if (err) {
                if (err.sqlMessage) {
                    console.log(err);
                    return res.status(500).json({ msg: err.sqlMessage });
                } else {
                    return res.status(500).json({ error: err });
                }
            }
            event.emit(allevents.departmentUpdate);
            return res.status(200).json({ msg: 'Attendence Add Successfully' });
        });
    }
    api.deleteAttendence = function (req, res, next) {
        console.log(req.body.rec_id);
        var sql = "DELETE  from `attendence`  where rec_id=" + req.body.rec_id;
        db.run(sql, function (err) {
            if (err) {
                console.log(err);
                //  req.log.error(err);
                return res.status(500).json({ error: err });
            }
            event.emit(allevents.attendenceUpdate);
            return res.status(200).json({ msg: 'Attendence Deleted successfully' });
        });
    }
    api.updateAttendence = function (req, res, next) {
        var sdate = moment(req.body.startDate).format("YYYY-MM-DD");
        var edate = moment(req.body.endDate).format("YYYY-MM-DD");
        var sql = '';
        if (req.body.extras) {
            sql = 'UPDATE `projects` SET `sid` = "' + req.body.sid + '", `name` = "' + req.body.fullname + '" ' +
                ', `status` = "' + req.body.status + '", `translation` = "' + req.body.othername + '" ' +
                ', `area` = "' + req.body.area + '", `location` = "' + req.body.location + '" ' +
                ', `startDate` = "' + sdate + '", `endDate` = "' + edate + '", `extras`= "' + req.body.extras + '"' +
                'where rec_id=' + req.body.rec_id;
        } else {
            sql = 'UPDATE `projects` SET `sid` = "' + req.body.sid + '", `name` = "' + req.body.fullname + '" ' +
                ', `status` = "' + req.body.status + '", `translation` = "' + req.body.othername + '" ' +
                ', `area` = "' + req.body.area + '", `location` = "' + req.body.location + '" ' +
                ', `startDate` = "' + sdate + '", `endDate` = "' + edate + '" ' +
                'where rec_id=' + req.body.rec_id;
        }

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


