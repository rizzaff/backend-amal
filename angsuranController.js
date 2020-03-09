'use strict';

const response = require('./res');
const connection = require('./conn');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [year, month, day].join('-');
}

exports.createAngsuran = async function (req, res) {
  
    let inserts = [];
    let status= req.body.status 
    let amount= req.body.amount 
    let tenor= req.body.tenor 
    // tenor = tenor+1
    let tgl_pembayaran= null
    let pengajuan_id = req.body.pengajuan_id;
    let jenispembayaran_id = null
    let tgl_jatuhtempo = new Date()
        
    for (let i = 0; i < tenor; i++) {
        let urutan_angsuran = i+1 
        let angsuran_id = uuidv4().slice(24, 36);
        // moment(tgl_jatuhtempo).add(1, 'month');
        tgl_jatuhtempo.setMonth(tgl_jatuhtempo.getMonth() + 1) 
        // console.log(tgl_jatuhtempo)
        inserts.push([angsuran_id, pengajuan_id, status, formatDate(tgl_jatuhtempo), urutan_angsuran, jenispembayaran_id, amount, tgl_pembayaran]);
        // console.log(inserts)
    }
    // console.log(inserts)
    connection.query('INSERT INTO angsuran(angsuran_id, pengajuan_id, status, tgl_jatuhtempo, urutan_angsuran, jenispembayaran_id, amount, tgl_pembayaran) VALUES ?',
        [inserts],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};