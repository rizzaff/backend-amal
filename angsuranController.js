'use strict';

const response = require('./res');
const connection = require('./conn');
const uuidv4 = require('uuid/v4');

exports.createAngsuran = async function (req, res) {
  
    let inserts = [];
    let pengajuan_id = req.body.pengajuan_id;
    let jenispembayaran_id = req.body.jenispembayaran_id;
    let tenor = req.body.tenor;
    for (let i = 0; i < tenor; i++) {
        let angsuran_id = uuidv4().slice(24, 36);
        inserts.push([angsuran_id, pengajuan_id, jenispembayaran_id, 'Belum Bayar']);
    }
    connection.query(`INSERT INTO angsuran(angsuran_id, pengajuan_id, jenispembayaran_id, status) VALUES ?`,
        [inserts],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};