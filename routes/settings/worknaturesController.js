var config = require('./../../config');
var db = config.database();
var allevents  =  require('./../../config/events');

module.exports = function apiRoutes(event) { 
var api = {};
api.getAllWorknatures = function(req,res,next) {
    var sql = '';
    sql = "SELECT * FROM worknatures where `isdelete`='n'";
    db.all(sql, function (err, rows) {
        if (err) {
            req.log.error(err);
            return next(err);
        }
        return res.send(rows);
    });

}
api.createWorkNature = function(req,res,next) {
  var   sql = 'INSERT INTO worknatures(`name`,`translation`,`extras`) ' + 
    'VALUES (?, ?, ?)';
    var data = [
        req.body.name,
        req.body.translation,
        req.body.extras ? req.body.extras : null
    ];

    //req.log.debug(sql);
    db.run(sql, data, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
      //  event.emit(allevents.departmentUpdate);
        return res.status(200).json({ msg: 'Worknature Add Successfully' });
    });
}
api.deleteWorkNature = function(req,res,next) {
    var sql = "UPDATE `worknatures` SET `isdelete` = 'y' where rec_id=" + req.body.depId;
    db.run(sql, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
        event.emit(allevents.departmentUpdate);
        return res.status(200).json({ msg: 'Worknature Deleted successfully' });
    });
}
api.updateWorkNature = function(req,res,next) {
    var sql = "UPDATE `worknatures` SET `name` = '"+req.body.name+"' where rec_id=" + req.body.rec_id;
    db.run(sql, function (err) {
        if (err) {
            console.log(err);
            //  req.log.error(err);
            return res.status(500).json({ error: err });
        }
        event.emit(allevents.departmentUpdate);
        return res.status(200).json({ msg: 'Worknature Update successfully' });
    });
}
return api;
}


