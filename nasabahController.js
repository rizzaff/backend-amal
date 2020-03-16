'use strict';

const response = require('./res');
const connection = require('./conn');
const uuidv4 = require('uuid/v4');

exports.createPegawai = function (req, res) {
    
    let pegawai_id = uuidv4().slice(24,36);
    let nama_perusahaan = req.body.nama_perusahaan;
    let nama_pimpinan = req.body.nama_pimpinan;
    let nomor_sk = req.body.nomor_sk;
    let status = req.body.status;
    let jenis_perusahaan = req.body.jenis_perusahaan;
    let tgl_pensiun = req.body.tgl_pensiun;
    let lama_kerja = req.body.lama_kerja;
    let alamat = req.body.alamat;
    let provinsi = req.body.provinsi;
    let kode_pos = req.body.kode_pos;
    let kabupaten = req.body.kabupaten;
    let kecamatan = req.body.kecamatan;
    let kelurahan = req.body.kelurahan;
    let kartu_identitas = req.body.kartu_identitas;
    let sk_pegawai = req.body.sk_pegawai;

    connection.query('INSERT INTO pegawai(pegawai_id, nama_perusahaan, nama_pimpinan, nomor_sk, status, jenis_perusahaan, tgl_pensiun, lama_kerja, alamat, provinsi, kabupaten, kecamatan, kelurahan, kode_pos, kartu_identitas, sk_pegawai) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [pegawai_id, nama_perusahaan, nama_pimpinan, nomor_sk, status, jenis_perusahaan, tgl_pensiun, lama_kerja, alamat, provinsi, kabupaten, kecamatan, kelurahan, kode_pos, kartu_identitas, sk_pegawai],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createMikro = function (req, res) {
    
    let mikro_id = uuidv4().slice(24,36);
    let nama = req.body.nama;
    let bidang_usaha = req.body.bidang_usaha;
    let lama_usaha = req.body.lama_usaha;
    let status_usaha = req.body.status_usaha;
    let jarak = req.body.jarak;
    let jenis = req.body.jenis;
    let alamat = req.body.alamat;
    let provinsi = req.body.provinsi;
    let kode_pos = req.body.kode_pos;
    let kabupaten = req.body.kabupaten;
    let kecamatan = req.body.kecamatan;
    let kelurahan = req.body.kelurahan;

    connection.query('INSERT INTO mikro(mikro_id, nama, bidang_usaha, lama_usaha, status_usaha, jarak, jenis, alamat, provinsi, kabupaten, kecamatan, kelurahan, kode_pos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [mikro_id, nama, bidang_usaha, lama_usaha, status_usaha, jarak, jenis, alamat, provinsi, kabupaten, kecamatan, kelurahan, kode_pos],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createTipeNasabah = function (req, res) {
    let tipenasabah_id = uuidv4().slice(24,36);
    let pegawai_id = req.body.pegawai_id;
    let mikro_id = req.body.mikro_id;
    
    connection.query('INSERT INTO tipe_nasabah(tipenasabah_id, pegawai_id, mikro_id) VALUES (?,?,?)',
        [tipenasabah_id, pegawai_id, mikro_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createNasabah = function (req, res) {
    let nasabah_id = req.body.nasabah_id; 
    let nama = req.body.nama 
    let tempat_lahir = req.body.tempat_lahir 
    let tanggal_lahir = req.body.tanggal_lahir 
    let jenis_kelamin = req.body.jenis_kelamin 
    let status= req.body.status 
    let nama_ibu= req.body.nama_ibu 
    let no_ktp= req.body.no_ktp 
    let alamat= req.body.alamat 
    let provinsi= req.body.provinsi 
    let kota= req.body.kota 
    let kecamatan= req.body.kecamatan 
    let kelurahan= req.body.kelurahan 
    let email= req.body.email 
    let no_hp= req.body.no_hp 
    let user_id= req.body.user_id
    
    connection.query('INSERT INTO nasabah(nasabah_id, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status, nama_ibu, no_ktp, alamat, provinsi, kota, kecamatan, kelurahan, email, no_hp, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [nasabah_id, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status, nama_ibu, no_ktp, alamat, provinsi, kota, kecamatan, kelurahan, email, no_hp, user_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewNasabahList = function (req, res) {
    connection.query('select nasabah_id,nama from nasabah',
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewNasabahDetail = function (req, res) {
    let nasabah_id = req.params.nasabah_id;
    connection.query('select * from nasabah where nasabah_id=?',[nasabah_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewKendaraanNasabah = function (req, res) {
    let nasabahid = req.query.nasabahid;
    connection.query('select p.jenis_dp, p.jenis_pekerjaan,m.nama as merk, m.kategori, k.tipe, k.status, k.warna, k.harga, k.cc, k.keterangan, k.tahun from kendaraan_nasabah k join pengajuan p on (k.pengajuan_id=p.pengajuan_id) join nasabah n on(n.nasabah_id=p.nasabah_id) join merk m on(m.merk_id=k.merk_id) where n.nasabah_id=?',[nasabahid],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewDpCash = function (req, res) {
    let nasabah_id = req.params.nasabah_id;
    connection.query('select c.* from dpcash c join pengajuan p on (p.dp_id=c.cash_id) join nasabah n on(n.nasabah_id=p.nasabah_id) where n.nasabah_id=?',[nasabah_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewDpEmas = function (req, res) {
    let nasabah_id = req.params.nasabah_id;
    connection.query('select e.* from dptabemas e join pengajuan p on (p.dp_id=e.dptabemas_id) join nasabah n on(n.nasabah_id=p.nasabah_id) where n.nasabah_id=?',[nasabah_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewDpJaminan = function (req, res) {
    let nasabah_id = req.params.nasabah_id;
    connection.query('select j.* from dpjaminan j join pengajuan p on (p.dp_id=j.jaminan_id) join nasabah n on(n.nasabah_id=p.nasabah_id) where n.nasabah_id=?',[nasabah_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewMikro = function (req, res) {
    let nasabah_id = req.params.nasabah_id;
    connection.query('select m.* from mikro m join pengajuan p on (p.pekerjaan_id=m.mikro_id) join nasabah n on(n.nasabah_id=p.nasabah_id) where n.nasabah_id=?',[nasabah_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewPegawai = function (req, res) {
    let nasabah_id = req.params.nasabah_id;
    connection.query('select pg.* from pegawai pg join pengajuan p on (p.pekerjaan_id=pg.pegawai_id) join nasabah n on(n.nasabah_id=p.nasabah_id) where n.nasabah_id=?',[nasabah_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};