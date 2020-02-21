'use strict';

const response = require('./res');
const connection = require('./conn');
const uuidv4 = require('uuid/v4');

exports.createPengajuan = function (req, res) {
    
    let pengajuan_id = uuidv4().slice(24,36);
    let nasabah_id = req.body.nasabah_id;
    let kendaraan_id = req.body.kendaraan_id;
    let cabang_id = req.body.cabang_id;
    let kondisi_kendaraan = req.body.kondisi_kendaraan;
    let harga_pasaran = req.body.harga_pasaran;
    let uangmuka_id = req.body.uangmuka_id;
    let marhunbih = req.body.marhunbih;
    let angsuran = req.body.angsuran;
    let verifikasi = req.body.verifikasi;
    let tenor = req.body.tenor;

    connection.query('INSERT INTO pengajuan(pengajuan_id, nasabah_id, kendaraan_id, cabang_id, kondisi_kendaraan, harga_pasaran, uangmuka_id, marhunbih, angsuran, verifikasi, tgl_transaksi, tenor) VALUES (?,?,?,?,?,?,?,?,?,?,current_timestamp(),?)',
        [pengajuan_id, nasabah_id, kendaraan_id, cabang_id, kondisi_kendaraan, harga_pasaran, uangmuka_id, marhunbih, angsuran, verifikasi, tenor],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.verifikasiPengajuan = function (req, res) {
    
    let pengajuan_id = req.body.pengajuan_id;
    
    connection.query('UPDATE pengajuan SET verifikasi=true WHERE pengajuan_id = ?',
        [pengajuan_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};