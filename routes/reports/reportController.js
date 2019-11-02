var config = require('./../../config');
var db = config.database();
var moment = require('moment');
module.exports = function apiRoutes() {
    var api = {};
    api.getDataFormMonthlySalaryReport = function (req, res, next) {
        const startOfMonth = moment(req.body.date).startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment(req.body.date).endOf('month').format('YYYY-MM-DD');
        console.log(startOfMonth);
        console.log(endOfMonth);
        var sql = "SELECT users.rec_id,users.name,users.isbouns_hour_apply,users.basic_salary,users.per_hour_rate,\
                    users.allowance_one,users.allowance_two, group_concat(attendence.overtime) as overtime, \
                    sum(attendence.status = 'Present' OR attendence.status = 'Leave') as presents ,sum(attendence.status = 'Absent') as absense\
                    FROM emy.users\
                    LEFT JOIN emy.attendence ON attendence.user_id = users.rec_id\
                    where emy.attendence.added_date >= '"+ startOfMonth + "' and emy.attendence.added_date <= '" + endOfMonth + "'\
                    group by users.rec_id";

        // 
        // 
        // sql = "SELECT * FROM attendence ;
        db.all(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return next(err);
            }
            return res.send(rows);
        });

    }
    api.getEmployeeDetail = function (req, res, next) {
        var sql = "SELECT SUM(CASE WHEN isactive = 'y' THEN 1 ELSE 0 END) AS active_users,\
                           SUM(CASE WHEN isactive = 'n' THEN 1 ELSE 0 END) AS deactive_users\
                      FROM emy.users;";
        db.all(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return next(err);
            }
            req.body.employeesDetail = rows;
            next()
            // return res.send(rows);
        });
    }
    api.getProjectDetail = function (req, res, next) {
       var empD = req.body.employeesDetail;
        var sql = " SELECT emy.projects.status, COUNT(status) as count\
        FROM emy.projects\
        WHERE isactive = 'y'\
        GROUP BY status";
        db.all(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return next(err);
            }
            var response = {};
            response['employeesDetail'] = empD;
            response['projectDetail'] = rows;
            return res.send(response);
        });
    }

    return api;
}


