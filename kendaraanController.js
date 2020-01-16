'use strict';

const response = require('./res');
const connection = require('./conn');
const uuidv4 = require('uuid/v4');

exports.createKendaraanBaru = function (req, res) {
    let baru_id = uuidv4().slice(24,36);
    let merk_id = req.body.merk_id;
    let tipe = req.body.tipe;
    let isi_silinder = req.body.isi_silinder;
    let nama_bpkb = req.body.nama_bpkb;
    let warna = req.body.warna;
    let keterangan = req.body.keterangan;

    connection.query('INSERT INTO kendaraan_baru(baru_id, merk_id, tipe, isi_silinder, nama_bpkb, warna, keterangan) VALUES (?,?,?,?,?,?,?)',
        [baru_id, merk_id, tipe, isi_silinder, nama_bpkb, warna, keterangan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createKendaraanBekas = function (req, res) {
    let bekas_id = uuidv4().slice(24,36);
    let merk_id = req.body.merk_id;
    let tipe = req.body.tipe;
    let isi_silinder = req.body.isi_silinder;
    let tahun_pembuatan = req.body.tahun_pembuatan;
    let nomor_polisi = req.body.nomor_polisi;
    let nama_bpkb = req.body.nama_bpkb;

    let no_bpkb = req.body.no_bpkb;
    let no_stnk = req.body.no_stnk;
    let no_rangka = req.body.no_rangka;
    let no_mesin = req.body.no_mesin;
    let warna = req.body.warna;
    let keterangan = req.body.keterangan;

    connection.query('INSERT INTO kendaraan_bekas(bekas_id, merk_id, tipe, isi_silinder, tahun_pembuatan, nomor_polisi, nama_bpkb, no_bpkb, no_stnk, no_rangka, no_mesin, warna, keterangan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [bekas_id, merk_id, tipe, isi_silinder, tahun_pembuatan, nomor_polisi, nama_bpkb, no_bpkb, no_stnk, no_rangka, no_mesin, warna, keterangan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createMerk = function (req, res) {
    let merk_id = uuidv4().slice(24,36);
    let nama = req.body.nama;
    let respon = "merk_id: "+merk_id+", nama: "+nama;
    connection.query('INSERT INTO merk (merk_id, nama) VALUES (?,?)',
        [merk_id, nama],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(respon, res)
            }
        });
};

exports.createStatusKendaraan = function (req, res) {
    let kendaraan_id = uuidv4().slice(24,36);
    let baru_id = req.body.baru_id;
    let bekas_id = req.body.bekas_id;
    
    connection.query('INSERT INTO status_kendaraan(kendaraan_id, baru_id, bekas_id) VALUES (?,?,?)',
        [kendaraan_id, baru_id, bekas_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};