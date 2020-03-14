'use strict';

const response = require('./res');
const connection = require('./conn');

exports.viewJourney = function (req, res) {
    let user_id = req.params.user_id;
    
    connection.query(`select p.pengajuan_id, n.no_hp, DATEDIFF(now(),min(a.tgl_jatuhtempo)) as selisihhari, p.jenis_dp,n.nama, (select an.angsuran_id from angsuran an where an.urutan_angsuran=min(a.urutan_angsuran) and an.pengajuan_id=p.pengajuan_id) as angsuranid, min(urutan_angsuran) as tagihanke, min(a.tgl_jatuhtempo) as jatuhtempo, 
    n.nasabah_id as nonasabah, (min(urutan_angsuran)-1) as sekarang, p.tenor, ROUND((min(urutan_angsuran)-1)/p.tenor,2) as step, p.tenor-(min(urutan_angsuran)-1) sisabulan, ((p.tenor-(min(urutan_angsuran)-1)) * p.angsuran) as sisabayar, ((min(urutan_angsuran) - 1) * p.angsuran) as sudahbayar, p.angsuran  from angsuran a join pengajuan p on(a.pengajuan_id=p.pengajuan_id) join nasabah n on(p.nasabah_id=n.nasabah_id) 
    join kendaraan_nasabah kn on(kn.pengajuan_id=p.pengajuan_id) where n.user_id=? and p.lunas=false and a.status!='Lunas' group by p.pengajuan_id, n.no_hp, p.jenis_dp,n.nama,nonasabah,p.angsuran`,
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