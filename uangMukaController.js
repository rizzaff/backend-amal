'use strict';

const response = require('./res');
const connection = require('./conn');

exports.createJaminan = function (req, res) {
    let jaminan_id= req.body.jaminan_id 
    let jenis= req.body.jenis 
    let berat_kotor= req.body.berat_kotor 
    let berat_bersih= req.body.berat_bersih 
    let karat= req.body.karat 
    let taksiran= req.body.taksiran 
    let persen= req.body.persen 
    let jumlahdp= req.body.jumlahdp 
    let link= req.body.link
    
    connection.query('INSERT INTO dpjaminan(jaminan_id, jenis, berat_kotor, berat_bersih, karat, taksiran, persen, jumlahdp, link) VALUES (?,?,?,?,?,?,?,?,?)',
        [jaminan_id, jenis, berat_kotor, berat_bersih, karat, taksiran, persen, jumlahdp, link],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createCash = function (req, res) {
    let cash_id = req.body.cash_id; 
    let jumlahdp = req.body.jumlahdp  
    let persen = req.body.persen 
    let diskonmunah = req.body.diskonmunah
    
    connection.query('INSERT INTO dpcash(cash_id, jumlahdp, persen, diskonmunah) VALUES (?,?,?,?)',
        [cash_id, jumlahdp, persen, diskonmunah],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createTabEmas = function (req, res) {
    let dptabemas_id =req.body.dptabemas_id 
    let gram=req.body.gram 
    let persen=req.body.persen 
    let konversi=req.body.konversi  
    let jumlahdp=req.body.jumlahdp  
    let diskonmunah=req.body.diskonmunah 
    
    connection.query('INSERT INTO dptabemas(dptabemas_id, gram, persen, konversi, jumlahdp, diskonmunah) VALUES (?,?,?,?,?,?)',
        [dptabemas_id, gram, persen, konversi, jumlahdp, diskonmunah],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};