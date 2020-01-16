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
    let nasabah_id = uuidv4().slice(24,36);
    let nama = req.body.nama;
    let tempat_lahir = req.body.tempat_lahir;
    let tanggal_lahir = req.body.tanggal_lahir;
    let jenis_kelamin = req.body.jenis_kelamin;
    let status = req.body.status;
    let nama_ibu = req.body.nama_ibu;
    let no_ktp = req.body.no_ktp;
    let foto_ktp = req.body.foto_ktp;
    let alamat = req.body.alamat;
    let provinsi = req.body.provinsi;
    let kota = req.body.kota;
    let kabupaten = req.body.kabupaten;
    let kecamatan = req.body.kecamatan;
    let kelurahan = req.body.kelurahan;
    let tipenasabah_id = req.body.tipenasabah_id;
    let user_id = req.body.user_id;

    connection.query('INSERT INTO nasabah(nasabah_id, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status, nama_ibu, no_ktp, foto_ktp, alamat, provinsi, kota, kabupaten, kecamatan, kelurahan, tipenasabah_id,user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [nasabah_id, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status, nama_ibu, no_ktp, foto_ktp, alamat, provinsi, kota, kabupaten, kecamatan, kelurahan, tipenasabah_id, user_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};