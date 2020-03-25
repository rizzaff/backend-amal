'use strict';

const response = require('./res');
const connection = require('./conn');
const uuidv4 = require('uuid/v4');

exports.createKendaraanList = function (req, res) {
    let tipe_id = uuidv4().slice(24,36);
    let merk_id = req.body.merk_id;
    let tipe = req.body.tipe;
    let cc = req.body.cc;
    let status = req.body.status;
    let harga = req.body.harga;
    let warna = req.body.warna;
    let keterangan = req.body.keterangan;
    let tahun = req.body.tahun;

    connection.query('INSERT INTO kendaraan_list(tipe_id, merk_id, tipe, cc, status, harga, warna, keterangan, tahun) VALUES (?,?,?,?,?,?,?,?,?)',
        [tipe_id, merk_id, tipe, cc, status, harga, warna, keterangan, tahun],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createKendaraanNasabah = function (req, res) {
    let kendaraan_id= uuidv4().slice(24,36); 
    let merk_id= req.body.merk_id 
    let tipe= req.body.tipe 
    let status= req.body.status 
    let cc= req.body.cc 
    let warna= req.body.warna 
    let keterangan= req.body.keterangan 
    let harga= req.body.harga 
    let tahun= req.body.tahun 
    let nobpkb= req.body.nobpkb 
    let pengajuan_id= req.body.pengajuan_id
    
    connection.query('INSERT INTO kendaraan_nasabah(kendaraan_id, merk_id, tipe, status, cc, warna, keterangan, harga, tahun, nobpkb, pengajuan_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [kendaraan_id, merk_id, tipe, status, cc, warna, keterangan, harga, tahun, nobpkb, pengajuan_id],
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

exports.inputBpkb = function (req, res) {
    let pengajuan_id = req.body.pengajuan_id;
    let bpkb = req.body.bpkb;
    connection.query('UPDATE kendaraan_nasabah SET nobpkb=? where pengajuan_id=?',
        [bpkb, pengajuan_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewMerk = function (req, res) {
    let kategori = req.params.kategori;
    connection.query('select * from merk where kategori = ?',[kategori],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.cariMerk = function (req, res) {
    let kategori = req.params.kategori;
    let cari = '%'+req.params.cari+'%';
    connection.query('select * from merk where kategori = ? and nama like ?',[kategori,cari],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewList = function (req, res) {
    let merk_id = req.params.merk_id;
    let status = req.params.status;
    
    connection.query('select DISTINCT tipe from kendaraan_list where merk_id = ? and status = ?',
        [merk_id, status],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.cariTipe = function (req, res) {
    let merk_id = req.params.merk_id;
    let status = req.params.status;
    let cari = '%'+req.params.cari+'%';
    
    connection.query('select DISTINCT tipe from kendaraan_list where merk_id = ? and status = ? and tipe like ?',
        [merk_id, status, cari],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewListWarna = function (req, res) {
    let tipe = req.params.tipe;
    let status = req.params.status;
    
    connection.query('select tipe_id, warna from kendaraan_list where tipe = ? and status = ?',
        [tipe, status],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.viewDetailKendaraan = function (req, res) {
    let tipeId = req.params.tipeId;
    
    connection.query('select * from kendaraan_list where tipe_id = ?',
        [tipeId],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};


exports.viewDetailMerk = function (req, res) {
    let merkId = req.params.merkId;
    
    connection.query('select * from merk where merk_id = ?',
        [merkId],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
                // res.json(rows)
            }
        });
};
// exports.createStatusKendaraan = function (req, res) {
//     let kendaraan_id = uuidv4().slice(24,36);
//     let baru_id = req.body.baru_id;
//     let bekas_id = req.body.bekas_id;
    
//     connection.query('INSERT INTO status_kendaraan(kendaraan_id, baru_id, bekas_id) VALUES (?,?,?)',
//         [kendaraan_id, baru_id, bekas_id],
//         function (error, rows, fields) {
//             if (error) {
//                 console.log(error)
//             } else {
//                 response.ok(rows, res)
//             }
//         });
// };

exports.hapusKendaraanNasabah = function (req, res) {
    
    let pengajuan_id = req.body.pengajuan_id;
    
    connection.query('delete from kendaraan_nasabah WHERE pengajuan_id = ?',
        [pengajuan_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};