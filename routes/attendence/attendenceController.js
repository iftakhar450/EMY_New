var config = require('./../../config');
var db = config.database();
var allevents = require('./../../config/events');
var moment = require('moment');
module.exports = function apiRoutes(event) {
    var api = {};
    api.getAttendenceBydate = function (req, res, next) {
        var adate = moment(req.body.date).format('YYYY-MM-DD');
        var sql = "SELECT attendence.rec_id,attendence.overtime,attendence.status,attendence.added_date,\
       u1.name as name, u2.name as supervisor, projects.name as project,projects.sid as projectId, worknatures.name as work\
        FROM emy.attendence\
        LEFT JOIN  emy.users      AS u1    ON   attendence.user_id =u1.rec_id \
        LEFT JOIN  emy.users      AS u2    ON  attendence.supervisor_id = u2.rec_id \
        LEFT JOIN emy.projects ON attendence.project_id = projects.rec_id\
        LEFT JOIN emy.worknatures ON attendence.work_id = worknatures.rec_id\
        where  `added_date`>= '"+ adate + "' AND `added_date` <= '" + adate + "'";

        // sql = "SELECT * FROM attendence ;
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
    api.getCardViewData = function (req, res, next) {
        console.log(req.body)
        const startOfMonth = moment(req.body.date).startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment(req.body.date).endOf('month').format('YYYY-MM-DD');
        console.log(startOfMonth);
        console.log(endOfMonth);
        var adate = moment(req.body.date).format('YYYY-MM-DD');
        var sql = "SELECT attendence.rec_id,attendence.overtime,attendence.status,attendence.added_date,\
           u1.name as name, u2.name as supervisor, projects.name as project,projects.sid as projectId, worknatures.name as work\
            FROM emy.attendence\
            LEFT JOIN  emy.users      AS u1    ON   attendence.user_id =u1.rec_id \
            LEFT JOIN  emy.users      AS u2    ON  attendence.supervisor_id = u2.rec_id \
            LEFT JOIN emy.projects ON attendence.project_id = projects.rec_id\
            LEFT JOIN emy.worknatures ON attendence.work_id = worknatures.rec_id\
            where  `added_date`>= '"+ startOfMonth + "' AND `added_date` <= '" + endOfMonth + "' AND user_id = '"+req.body.uid+"'";

        db.all(sql, function (err, rows) {
            if (err) {
                return next(err);
            }
            return res.send(rows);
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

        var sql = 'UPDATE `attendence` SET `project_id` = "' + req.body.pid + '" ' +
            ', `overtime` = "' + req.body.overtime + '", `status` = "' + req.body.status + '" ' +
            ', `work_id` = "' + req.body.wid + '"' +
            'where rec_id=' + req.body.rec_id;


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


