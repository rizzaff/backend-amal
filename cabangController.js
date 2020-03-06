'use strict';

const response = require('./res');
const connection = require('./conn');
const uuidv4 = require('uuid/v4');

exports.createCabang = function (req, res) {
    let cabang_id = uuidv4().slice(24,36);
    let nama = req.body.nama;
    let alamat = req.body.alamat;
    let no_telp = req.body.no_telp;

    connection.query('INSERT INTO cabang(cabang_id, nama, alamat, no_telp) VALUES (?,?,?,?)',
        [cabang_id, nama, alamat, no_telp],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewCabang = function (req, res) {
    connection.query('select * from cabang limit 10',
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.cariCabang = function (req, res) {
    let cari = '%'+req.params.cari+'%';
    connection.query(`select * from cabang where nama like ?`,[cari],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};
