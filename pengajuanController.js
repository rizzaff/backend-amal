'use strict';

const response = require('./res');
const connection = require('./conn');

exports.createPengajuan = function (req, res) {
    let pengajuan_id= req.body.pengajuan_id 
    let cabang_id= req.body.cabang_id 
    let marhunbih= req.body.marhunbih 
    let angsuran= req.body.angsuran 
    let verifikasi= req.body.verifikasi 
    let lunas= req.body.lunas 
    let tgl_transaksi= req.body.tgl_transaksi 
    let tenor= req.body.tenor 
    let nasabah_id= req.body.nasabah_id 
    let jenis_dp= req.body.jenis_dp 
    let dp_id= req.body.dp_id 
    let jenis_pekerjaan= req.body.jenis_pekerjaan 
    let pekerjaan_id= req.body.pekerjaan_id
    
    connection.query('INSERT INTO pengajuan(pengajuan_id, cabang_id, marhunbih, angsuran, verifikasi, lunas, tgl_transaksi, tenor, nasabah_id, jenis_dp, dp_id, jenis_pekerjaan, pekerjaan_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [pengajuan_id, cabang_id, marhunbih, angsuran, verifikasi, lunas, tgl_transaksi, tenor, nasabah_id, jenis_dp, dp_id, jenis_pekerjaan, pekerjaan_id],
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