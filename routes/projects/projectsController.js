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
    api.selectSupervisor = function (req, res, next) {
        var sql = '';
        if (req.query.id) {
            sql = `SELECT rec_id,name, project_ids FROM users where isdelete = 'n' and isadmin='y' and rec_id = ${req.query.id}`;
            db.all(sql, function (err, rows) {
                if (err) {
                  //  req.log.error(err);
                  console.log(err)

                    return next(err);
                }
                console.log();
                if (rows.length > 0) {
                   // next();
                 //  console.log(rows[0].project_ids)
                   req.projects = rows[0].project_ids;
                   next();
                   // return res.send(rows);
                } else {
                    return res.status(201).send({ msg: 'no user founs with this id' });
                }
                
            });
        } else {
            return res.status(401).send({ msg: 'id not found' });
        }

    }
    api.getProjectsBySupervisor = function (req, res, next) {
        var sql = '';
        console.log(req.projects)
        if(req.projects) {
            sql = `SELECT * FROM projects where isdelete = 'n' and isactive = 'y' and rec_id In(${req.projects})`;

       } else {
            sql = "SELECT * FROM projects where isdelete = 'n' and isactive = 'y'";

        }
        console.log(sql)
        db.all(sql, function (err, rows) {
            if (err) {
                req.log.error(err);
                return next(err);
            }
            return res.send(rows);
        });

    }

    api.createNewProject = function (req, res, next) {
        var sdate = moment(req.body.startDate).format('YYYY-MM-DD');
        var edate = moment(req.body.endDate).format("YYYY-MM-DD");
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
                if (err.sqlMessage) {
                    return res.status(500).json({ msg: err.sqlMessage });
                } else {
                    return res.status(500).json({ error: err });
                }
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
            event.emit(allevents.projectUpdate);
            return res.status(200).json({ msg: 'Project Deleted successfully' });
        });
    }
    api.updateProject = function (req, res, next) {
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


