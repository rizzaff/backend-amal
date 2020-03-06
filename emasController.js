'use strict';

const response = require('./res');
const connection = require('./conn');

exports.viewEmasUser = function (req, res) {
    let userid = req.params.userid;
    connection.query('select * from tab_emas where userid = ?',[userid],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewEmasKonversi = function (req, res) {
    let satuan = req.params.satuan;
    connection.query('select * from hargaemas where satuan = ?',[satuan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};