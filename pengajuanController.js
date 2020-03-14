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
    let tgl_transaksi= new Date() 
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

exports.viewPengajuan = function (req, res) {
    let user_id = req.params.user_id;
    
    connection.query('select p.jenis_pekerjaan,n.nama as nmnasabah, p.verifikasi, p.lunas, p.tenor, kn.harga, p.marhunbih, p.angsuran, c.nama as nmcabang, m.nama as merk, kn.tipe, kn.status, kn.warna from pengajuan p join nasabah n on (p.nasabah_id = n.nasabah_id) join kendaraan_nasabah kn on(kn.pengajuan_id = p.pengajuan_id) join merk m on(m.merk_id=kn.merk_id) join cabang c on(c.cabang_id = p.cabang_id) where n.user_id=?',
    [user_id],
        function (error, rows, fields) {
            // console.log(this.sql)
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