'use strict';

const response = require('./res');
const connection = require('./conn');
const uuidv4 = require('uuid/v4');

exports.createJaminan = function (req, res) {
    let jaminan_id = uuidv4().slice(24,36);
    let jenis = req.body.jenis;
    let merk = req.body.merk;
    let tipe = req.body.tipe;
    let harga = req.body.harga;
    let jenis_perhiasan = req.body.jenis_perhiasan;
    let jumlah = req.body.jumlah;
    let berat_kotor = req.body.berat_kotor;
    let berat_bersih = req.body.berat_bersih;
    let karat = req.body.karat;
    let taksiran = req.body.taksiran;
    let keterangan = req.body.keterangan;

    connection.query('INSERT INTO jaminan(jaminan_id, jenis, merk, tipe, harga, jenis_perhiasan, jumlah, berat_kotor, berat_bersih, karat, taksiran, keterangan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [jaminan_id, jenis, merk, tipe, harga, jenis_perhiasan, jumlah, berat_kotor, berat_bersih, karat, taksiran, keterangan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createCash = function (req, res) {
    let cash_id = uuidv4().slice(24,36);
    let cash = req.body.cash;
    
    connection.query('INSERT INTO cash(cash_id, cash) VALUES (?,?)',
        [cash_id, cash],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createTabEmas = function (req, res) {
    let tabemas_id = uuidv4().slice(24,36);
    let no_rek = req.body.no_rek;
    let saldo = req.body.saldo;

    connection.query('INSERT INTO tab_emas(tabemas_id, no_rek, saldo) VALUES (?,?,?)',
        [tabemas_id, no_rek, saldo],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createUangMuka = function (req, res) {
    let uangmuka_id = uuidv4().slice(24,36);
    let cash_id = req.body.cash_id;
    let tabemas_id = req.body.tabemas_id;
    let jaminan_id = req.body.jaminan_id;
    let harga = req.body.harga;

    connection.query('INSERT INTO status_uangmuka(uangmuka_id, cash_id, tabemas_id, jaminan_id, harga) VALUES (?,?,?,?,?)',
        [uangmuka_id, cash_id, tabemas_id, jaminan_id, harga],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};