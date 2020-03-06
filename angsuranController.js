'use strict';

const response = require('./res');
const connection = require('./conn');
const uuidv4 = require('uuid/v4');

exports.createAngsuran = async function (req, res) {
  
    let inserts = [];
    let status= req.body.status 
    let amount= req.body.amount 
    let tgl_pembayaran= null
    let pengajuan_id = req.body.pengajuan_id;
    let jenispembayaran_id = null
    for (let i = 0; i < tenor; i++) {
        let urutan_angsuran = i 
        let tgl_jatuhtempo = new Date(date.setMonth(date.getMonth()+i)) 
        let angsuran_id = uuidv4().slice(24, 36);
        inserts.push([angsuran_id, pengajuan_id, status, tgl_jatuhtempo, urutan_angsuran, jenispembayaran_id, amount, tgl_pembayaran]);
    }
    connection.query('INSERT INTO angsuran(angsuran_id, pengajuan_id, status, tgl_jatuhtempo, urutan_angsuran, jenispembayaran_id, amount, tgl_pembayaran) VALUES (?,?,?,?,?,?,?,?)',
        [inserts],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};