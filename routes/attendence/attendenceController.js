var config = require('./../../config');
var db = config.database();
var allevents = require('./../../config/events');
var moment = require('moment');
const mailjet = require('node-mailjet')
    .connect('4c0868baa5e6d7d7dfada0146553e9f8', '662ecedd5df7f95ef77b5981a7ca2057')
const request = mailjet
module.exports = function apiRoutes(event) {
    var api = {};
    api.getAttendenceBydate = function (req, res, next) {
       // var adate = moment(req.body.date).format('YYYY-MM-DD');
        const sDate = moment(req.body.date).startOf('day').format('YYYY-MM-DD');
        const eDate = moment(req.body.date).endOf('day').format('YYYY-MM-DD');
        var sql = "SELECT attendence.rec_id,attendence.overtime,attendence.status,attendence.added_date,\
       u1.name as name, u1.othername as othername, u2.name as supervisor, projects.name as project,projects.sid as projectId, worknatures.name as work\
        FROM attendence\
        LEFT JOIN  users      AS u1    ON   attendence.user_id =u1.rec_id \
        LEFT JOIN  users      AS u2    ON  attendence.supervisor_id = u2.rec_id \
        LEFT JOIN projects ON attendence.project_id = projects.rec_id\
        LEFT JOIN worknatures ON attendence.work_id = worknatures.rec_id\
        where  `added_date`>= '"+ sDate + "' AND `added_date` <= '" + eDate + "'";

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
        // console.log(req.body)
        const startOfMonth = moment(req.body.date).startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment(req.body.date).endOf('month').format('YYYY-MM-DD');
        // console.log(startOfMonth);
        // console.log(endOfMonth);
        var adate = moment(req.body.date).format('YYYY-MM-DD');
        var sql = "SELECT attendence.rec_id,attendence.overtime,attendence.status,attendence.added_date,\
           u1.name as name, u2.name as supervisor, projects.name as project,projects.sid as projectId, worknatures.name as work\
            FROM attendence\
            LEFT JOIN  users      AS u1    ON   attendence.user_id =u1.rec_id \
            LEFT JOIN  users      AS u2    ON  attendence.supervisor_id = u2.rec_id \
            LEFT JOIN projects ON attendence.project_id = projects.rec_id\
            LEFT JOIN worknatures ON attendence.work_id = worknatures.rec_id\
            where  `added_date`>= '"+ startOfMonth + "' AND `added_date` <= '" + endOfMonth + "' AND user_id = '" + req.body.uid + "'";

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
            mailSend();
            return res.status(200).json({ msg: 'Attendence Add Successfully' });
        });
    }
    api.createMutliUserAttendence = function (req, res, next) {
        var adate = moment(req.body.date).format('YYYY-MM-DD');
        // console.log(adate)
     console.log(req.body.data);
        var data = [];
        for (i = 0; i < req.body.data.length; i++) {
            var pid = null;
            if (req.body.data[i].pid) {
                pid = req.body.data[i].pid;
            }
            var wid = null;
            if (req.body.data[i].wid) {
                wid = req.body.data[i].wid;
            }
            var ele = `(${req.body.data[i].uid} ,${pid} ,${req.body.data[i].overtime},${req.body.data[i].added_by},${wid},${JSON.stringify(adate)},${JSON.stringify(req.body.data[i].status)})`;
            data.push(ele);
        }
        // console.log(data);
        var sql = 'INSERT IGNORE INTO attendence(`user_id`,`project_id`,`overtime`,`supervisor_id`,`work_id`,`added_date`, `status`) ' +
            `VALUES ${data}`;

        // console.log(sql);
        //  return res.status(200).json({ msg: 'success' });
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
            mailSend();
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
    api.getUserforAttendence = function (req, res, next) {
        var today = JSON.stringify(moment().format('YYYY-MM-DD'));
        console.log('user for today attendence' + today);
        var sql = `SELECT  u.rec_id,u.name, u.othername, u.supervisor_id\
      FROM    users  as u WHERE   u.rec_id  NOT 
      IN\
      (SELECT   a.user_id\
      FROM    attendence  as a where a.added_date = ${today}) \
       And u.isactive = "y" and \
      isdelete = "n" AND isadmin = "n"`;

      console.log(sql);
        db.all(sql, function (err, rows) {
            if (err) {
                return next(err);
            }
            return res.send(rows);
        });
    }
    return api;
}

function mailSend() {

}

