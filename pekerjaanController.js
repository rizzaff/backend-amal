'use strict';

const response = require('./res');
const connection = require('./conn');

exports.createPegawai = function (req, res) {
    let pegawai_id= req.body.pegawai_id 
    let nama_perusahaan= req.body.nama_perusahaan 
    let telp= req.body.telp 
    let status= req.body.status 
    let jenis_perusahaan= req.body.jenis_perusahaan 
    let tgl_pensiun= req.body.tgl_pensiun 
    let lama_kerja= req.body.lama_kerja 
    let alamat= req.body.alamat 
    let provinsi= req.body.provinsi 
    let kota= req.body.kota 
    let kecamatan= req.body.kecamatan 
    let kelurahan= req.body.kelurahan 
    let kode_pos= req.body.kode_pos 
    let link_ktp= req.body.link_ktp 
    let link_sk= req.body.link_sk 
    let link_kk= req.body.link_kk 
    let link_slip= req.body.link_slip 
    let link_rek= req.body.link_rek
    
    connection.query('INSERT INTO pegawai(pegawai_id, nama_perusahaan, telp, status, jenis_perusahaan, tgl_pensiun, lama_kerja, alamat, provinsi, kota, kecamatan, kelurahan, kode_pos, link_ktp, link_sk, link_kk, link_slip, link_rek) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [pegawai_id, nama_perusahaan, telp, status, jenis_perusahaan, tgl_pensiun, lama_kerja, alamat, provinsi, kota, kecamatan, kelurahan, kode_pos, link_ktp, link_sk, link_kk, link_slip, link_rek],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createMikro = function (req, res) {
    let mikro_id=req.body.mikro_id 
    let nama=req.body.nama 
    let bidang_usaha=req.body.bidang_usaha 
    let lama_usaha=req.body.lama_usaha 
    let status_usaha=req.body.status_usaha 
    let jarak=req.body.jarak 
    let jenis=req.body.jenis 
    let alamat=req.body.alamat 
    let provinsi=req.body.provinsi 
    let kota=req.body.kota 
    let kecamatan=req.body.kecamatan 
    let kelurahan=req.body.kelurahan 
    let kode_pos=req.body.kode_pos 
    let link_ktp=req.body.link_ktp 
    let link_kk=req.body.link_kk 
    let link_depan=req.body.link_depan 
    let link_dalam=req.body.link_dalam
    
    connection.query('INSERT INTO mikro(mikro_id, nama, bidang_usaha, lama_usaha, status_usaha, jarak, jenis, alamat, provinsi, kota, kecamatan, kelurahan, kode_pos, link_ktp, link_kk, link_depan, link_dalam) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [mikro_id, nama, bidang_usaha, lama_usaha, status_usaha, jarak, jenis, alamat, provinsi, kota, kecamatan, kelurahan, kode_pos, link_ktp, link_kk, link_depan, link_dalam],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.hapusPegawai = function (req, res) {
    
    let pekerjaan_id = req.body.pekerjaan_id;
    
    connection.query('delete from pegawai WHERE pegawai_id = ?',
        [pekerjaan_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.hapusMikro = function (req, res) {
    
    let pekerjaan_id = req.body.pekerjaan_id;
    
    connection.query('delete from mikro WHERE mikro_id = ?',
        [pekerjaan_id],
        function (error, rows, fields) {
            console.log(this.sql)
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};