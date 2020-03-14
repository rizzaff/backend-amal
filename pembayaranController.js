'use strict';

const response = require('./res');
const connection = require('./conn');
const uuidv4 = require('uuid/v4');

function NOW() {

    let date = new Date();
    let aaaa = date.getFullYear();
    let gg = date.getDate();
    let mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    let cur_day = aaaa + "-" + mm + "-" + gg;

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;

}

exports.index = function (req, res) {
    response.ok("welcome to amal backend", res)
};

exports.getPembayaranAngsuran = function (req, res) {
    let user_id = req.body.user_id;
    
    connection.query(`SELECT c.nama, c.nasabah_id, c.user_id, a.tgl_jatuhtempo, a.status, a.urutan_angsuran, b.angsuran, b.pengajuan_id FROM angsuran a JOIN pengajuan b ON b.pengajuan_id = a.pengajuan_id  JOIN nasabah c ON b.nasabah_id = c.nasabah_id WHERE c.user_id = ? AND a.status = 'Belum Bayar' ORDER BY tgl_jatuhtempo ASC LIMIT 1`,
        [user_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
    })
};

exports.createMerk = function (req, res) {
    let merk_id = uuidv4().slice(24,36);
    let nama = req.body.nama;
    
    connection.query(`INSERT INTO merk (merk_id, nama) VALUES (?,?)`,
        [merk_id,nama],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                const data = [{
                    merk_id: merk_id,
                    nama: nama,
                  }]
                response.ok(data, res)
            }
    })
};

exports.pembayaranGcash = function (req, res) {
   
    let gcash_id = uuidv4().slice(24,36);
    let nomor_gcash = req.body.nomor_gcash;
    let cash_in = req.body.cash_in;
    let cash_out = req.body.cash_out;
    let tgl_payment = NOW();
    let jenis_transaksi = req.body.jenis_transaksi;
    let user_id = req.body.user_id;
    let status = "Lunas";
    
    connection.query('INSERT INTO history_gcash (gcash_id, nomor_gcash, cash_in, cash_out, tgl_payment, jenis_transaksi, user_id, status) VALUES (?,?,?,?,?,?,?,?)',
        [gcash_id,nomor_gcash,cash_in,cash_out,tgl_payment,jenis_transaksi,user_id,status],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                const data = [{
                    gcash_id : gcash_id,
                    nomor_gcash : nomor_gcash,
                    cash_in : cash_in,
                    cash_out : cash_out,
                    tgl_payment : tgl_payment,
                    jenis_transaksi : jenis_transaksi,
                    user_id : user_id,
                  }]
                response.ok(data, res)
            }
    });
};

exports.getGcashBalance = function (req, res) {
    let user_id = req.body.user_id;
    let nomor_gcash = req.body.nomor_gcash;

    connection.query('SELECT (SUM(a.cash_in)-SUM(a.cash_out)) AS balance, a.nomor_gcash, a.user_id, b.nama FROM history_gcash a join user u on u.user_id = a.user_id JOIN nasabah b ON b.user_id = u.user_id  WHERE a.user_id = ? AND a.nomor_gcash = ? group by a.nomor_gcash, a.user_id, b.nama',
    [user_id,nomor_gcash],
    function(error,rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
};

exports.PembentukanNomorGcash = function (req, res){
    // baca ini dulu https://www.codediesel.com/nodejs/mysql-transactions-in-nodejs/

    let nomorHp = req.body.nomorHp;
    let bank = req.body.bank;
    let noRekening = req.body.noRekening;
    let nama = req.body.nama;
    let ibuKandung = req.body.ibuKandung;
    let tglLahir = req.body.tglLahir;

    let gcashUniqcode = "";
    let length_nomorHp = 13;
    let i = 0;
    let nomorHp_parse = nomorHp.substring(1);
    let add_zero = length_nomorHp - nomorHp_parse.length;
    for( i = 0; i < add_zero; i++) {
      nomorHp_parse = nomorHp_parse + "0"; 
    }

    if(bank = "009"){
        gcashUniqcode = "888";
    } else if (bank = "002"){
        gcashUniqcode = "999";
    } else if (bank = "008"){
        gcashUniqcode = "777";
    } else {
        gcashUniqcode = "666";
    }   

    let gcash_id = uuidv4().slice(24,36);
    let nomor_gcash = gcashUniqcode + nomorHp_parse;
    let cash_in = 0;
    let cash_out = 0;
    let tgl_payment = NOW();
    let jenis_transaksi = "Pembentukan Nomor GCash";
    let user_id = req.body.user_id;
    let pin = req.body.pin;
    let status = "Lunas";

    /* Begin transaction */
    connection.beginTransaction(function(err) {
        if (err) { 
            throw err; 
        }
        connection.query('INSERT INTO gcash (user_id, nama, ibu_kandung, tgl_lahir, nomor_hp, bank, no_rekening, nomor_gcash,pin) VALUES (?,?,?,?,?,?,?,?,?)',
        [user_id,nama,ibuKandung,tglLahir,nomorHp,bank,noRekening,nomor_gcash,pin], 
        function(err, result) {
            if (err) { 
                connection.rollback(function() {
                    throw err;
                });
            }  
            connection.query('INSERT INTO history_gcash (gcash_id, nomor_gcash, cash_in, cash_out, tgl_payment, jenis_transaksi, user_id) VALUES (?,?,?,?,?,?,?)',
            [gcash_id,nomor_gcash,cash_in,cash_out,tgl_payment,jenis_transaksi,user_id,status], 
            function(err, result) {
                if (err) { 
                    connection.rollback(function() {
                        throw err;
                    });
                }        
                connection.commit(function(err) {
                    if (err) { 
                        connection.rollback(function() {
                            throw err;
                        });
                    }
                    console.log('Transaction Complete.');
                    const data = [{
                        nomorHp : nomorHp,
                        bank : bank,
                        noRekening : noRekening,
                        nama : nama,
                        ibuKandung : ibuKandung,
                        tglLahir : tglLahir,
                        gcash_id : gcash_id,
                        nomor_gcash : nomor_gcash,
                        tgl_payment : tgl_payment,
                        jenis_transaksi : jenis_transaksi,
                        user_id : user_id,
                    }]
                    response.ok(data, res)
                });
            });
        });
    }); /* End transaction */  
};

exports.getHistoryGCash = function (req, res) {
    let nomor_gcash = req.body.nomor_gcash;
    let user_id = req.body.user_id;
    
    connection.query(`SELECT * FROM history_gcash WHERE nomor_gcash = ? and user_id = ?`,
        [nomor_gcash,user_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
                console.log(this.sql)
            }
    })
};

exports.getHistoryAngsuran = function (req, res) {
    let pengajuan_id = req.body.pengajuan_id;
    
    connection.query('SELECT * FROM angsuran WHERE status = "Lunas" AND pengajuan_id = ?' ,
        [pengajuan_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
    })
};

exports.createInquiryVA = function(req,res){
    console.log("====== Run endpoint /inquiry/va - createPembayaranAngsuran =======");
    
    //------------update tabel jenis pembayaran tipe pembayaran
    let jenispembayaran_id = uuidv4().slice(24,36);
    let angsuran_id = req.body.angsuran_id;
    let pengajuan_id = req.body.pengajuan_id;
    let jenis_pembayaran = "virtual Account"
    let outlet_id = "0";
    let transfer_id = "0"
    let va_id =	uuidv4().slice(24,36);
    let tgl_pembayaran = NOW();
    let penyedia_layanan = req.body.penyedia_layanan;
    let jenis_transaksi = req.body.jenis_transaksi;
    let nasabah_id = req.body.nasabah_id;
    let status_angsuran = "Request Bayar";
    let amount = req.body.amount;
    let nomorHp = req.body.nomor_hp;
    let bank = req.body.bank;

    let vaUniqcode = "";
    let length_nomorHp = 13;
    let i = 0;
    let nomorHp_parse = nomorHp.substring(1);
    let add_zero = length_nomorHp - nomorHp_parse.length;
    for( i = 0; i < add_zero; i++) {
      nomorHp_parse = nomorHp_parse + "8"; 
    }

    if(bank == "009"){
        vaUniqcode = "555";
    } else if (bank == "002"){
        vaUniqcode = "444";
    } else if (bank == "008"){
        vaUniqcode = "333";
    } else {
        vaUniqcode = "222";
    }   

    let gcash_id = "0";
    let no_va = vaUniqcode + nomorHp_parse;

    /* Begin transaction */
    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query(`UPDATE angsuran SET status = ?, amount = ?, tgl_pembayaran = ?, jenispembayaran_id = ? WHERE angsuran_id = ? `,
        [status_angsuran,amount,tgl_pembayaran,jenispembayaran_id,angsuran_id], 
        function(err, result) {
            if (err) { 
                connection.rollback(function() {
                throw err;
                });
            }
            console.log("====== Query 1 pass =======");
            
            connection.query('INSERT INTO virtual_account (va_id,no_va,bank,amount,penyedia_layanan,jenis_transaksi,status,tgl_payment) VALUES (?,?,?,?,?,?,?,?)',
                [va_id,no_va,bank,amount,penyedia_layanan,jenis_transaksi,status_angsuran,tgl_pembayaran],
                function(err, result) {
                if (err) { 
                    connection.rollback(function() {
                    throw err;
                    });
                }
                console.log("====== Query 2 pass =======");

                    connection.query('INSERT INTO jenis_pembayaran (jenispembayaran_id,outlet_id,va_id,gcash_id,transfer_id) VALUES (?,?,?,?,?)',
                    [jenispembayaran_id,outlet_id,va_id,gcash_id,transfer_id], 
                    function(err, result) {
                        if (err) { 
                            connection.rollback(function() {
                            throw err;
                            });
                        }  
                        console.log("====== Query 3 pass =======");
                        
                        connection.commit(function(err) {
                                if (err) { 
                                    connection.rollback(function() {
                                    throw err;
                                    });
                                }

                               const data = [{
                                        status_angsuran : status_angsuran,
                                        jenis_pembayaran : jenis_pembayaran,
                                        pengajuan_id : pengajuan_id,
                                        amount : amount,
                                        jenispembayaran_id : jenispembayaran_id,
                                        angsuran_id : angsuran_id,
                                        va_id :	va_id,
                                        no_va : no_va,
                                        tgl_pembayaran : tgl_pembayaran,
                                        bank : bank,
                                        penyedia_layanan : penyedia_layanan,
                                        jenis_transaksi : jenis_transaksi,
                                        nasabah_id : nasabah_id,
                                    }]  
                                response.ok(data, res)
                                console.log('Transaction Complete.');
                        });
                    });
                });
            });
        });
    /* End transaction */
}

exports.createInquiryGC = function(req,res){
    console.log("====== Run endpoint /inquiry/va - createPembayaranAngsuran =======");
    
    //------------update tabel jenis pembayaran tipe pembayaran
    let jenispembayaran_id = uuidv4().slice(24,36);
    let angsuran_id = req.body.angsuran_id;
    let jenis_pembayaran = "G-Cash"
    let outlet_id = "0";
    let transfer_id = "0"
    let va_id =	"0";
    let tgl_pembayaran = NOW();
    let penyedia_layanan = req.body.penyedia_layanan;
    let jenis_transaksi = req.body.jenis_transaksi;
    let user_id = req.body.user_id;
    let status_angsuran = "Lunas";
    let amount = req.body.amount;
    let gcash_id = uuidv4().slice(24,36);
    let nomor_gcash = req.body.nomor_gcash;
    let cash_in = "0"

    /* Begin transaction */
    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query(`UPDATE angsuran SET status = ?, amount = ?, tgl_pembayaran = ?, jenispembayaran_id = ? WHERE angsuran_id = ? `,
        [status_angsuran,amount,tgl_pembayaran,jenispembayaran_id,angsuran_id], 
        function(err, result) {
            if (err) { 
                connection.rollback(function() {
                throw err;
                });
            }
            console.log("====== Query 1 pass =======");
            
            connection.query('INSERT INTO history_gcash (gcash_id,nomor_gcash,cash_in,cash_out,tgl_payment,jenis_transaksi,user_id,status) VALUES (?,?,?,?,?,?,?,?)',
                [gcash_id,nomor_gcash,cash_in,amount,tgl_pembayaran,jenis_transaksi,user_id,status_angsuran],
                function(err, result) {
                if (err) { 
                    connection.rollback(function() {
                    throw err;
                    });
                }
                console.log("====== Query 2 pass =======");

                    connection.query('INSERT INTO jenis_pembayaran (jenispembayaran_id,outlet_id,va_id,gcash_id,transfer_id) VALUES (?,?,?,?,?)',
                    [jenispembayaran_id,outlet_id,va_id,gcash_id,transfer_id], 
                    function(err, result) {
                        if (err) { 
                            connection.rollback(function() {
                            throw err;
                            });
                        }  
                        console.log("====== Query 3 pass =======");
                        
                        connection.commit(function(err) {
                                if (err) { 
                                    connection.rollback(function() {
                                    throw err;
                                    });
                                }

                               const data = [{
                                        status_angsuran : status_angsuran,
                                        jenis_pembayaran : jenis_pembayaran,
                                        gcash_id : gcash_id,
                                        nomor_gcash : nomor_gcash,
                                        amount : amount,
                                        jenispembayaran_id : jenispembayaran_id,
                                        angsuran_id : angsuran_id,
                                        tgl_pembayaran : tgl_pembayaran,
                                        penyedia_layanan : penyedia_layanan,
                                        jenis_transaksi : jenis_transaksi,
                                        user_id : user_id,
                                        
                                    }]  
                                response.ok(data, res)
                                console.log('Transaction Complete.');
                        });
                    });
                });
            });
        });
    /* End transaction */
}

exports.createInquiryTF = function(req,res){
    console.log("====== Run endpoint /inquiry/va - createPembayaranAngsuran =======");
    
    //------------update tabel jenis pembayaran tipe pembayaran
    let jenispembayaran_id = uuidv4().slice(24,36);
    let angsuran_id = req.body.angsuran_id;
    let jenis_pembayaran = "Transfer Manual"
    let outlet_id = "0";
    let gcash_id = "0";
    let va_id =	"0";
    let transfer_id = uuidv4().slice(24,36);
    let tgl_pembayaran = NOW();
    let penyedia_layanan = req.body.penyedia_layanan;
    let jenis_transaksi = req.body.jenis_transaksi;
    let nasabah_id = req.body.nasabah_id;
    let status_angsuran = "Request Bayar";
    let amount = req.body.amount;
    let no_rek = req.body.no_rek;
    let bank = req.body.bank;

    let norekGiro = "";

    if(bank = "009"){
        norekGiro = "8880909111888";
    } else if (bank = "002"){
        norekGiro = "7770909111777";
    } else if (bank = "008"){
        norekGiro = "6660909111666";
    } else {
        norekGiro = "5550909111555";
    }   

    /* Begin transaction */
    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query(`UPDATE angsuran SET status = ?, amount = ?, tgl_pembayaran = ?, jenispembayaran_id = ? WHERE angsuran_id = ? `,
        [status_angsuran,amount,tgl_pembayaran,jenispembayaran_id,angsuran_id], 
        function(err, result) {
            if (err) { 
                connection.rollback(function() {
                throw err;
                });
            }
            console.log("====== Query 1 pass =======");
            
            connection.query('INSERT INTO transfer (transfer_id,no_rek,amount,status,norek_giro,bank) VALUES (?,?,?,?,?,?)',
                [transfer_id,no_rek,amount,status_angsuran,norekGiro,bank],
                function(err, result) {
                if (err) { 
                    connection.rollback(function() {
                    throw err;
                    });
                }
                console.log("====== Query 2 pass =======");

                    connection.query('INSERT INTO jenis_pembayaran (jenispembayaran_id,outlet_id,va_id,gcash_id,transfer_id) VALUES (?,?,?,?,?)',
                    [jenispembayaran_id,outlet_id,va_id,gcash_id,transfer_id], 
                    function(err, result) {
                        if (err) { 
                            connection.rollback(function() {
                            throw err;
                            });
                        }  
                        console.log("====== Query 3 pass =======");
                        
                        connection.commit(function(err) {
                                if (err) { 
                                    connection.rollback(function() {
                                    throw err;
                                    });
                                }

                               const data = [{
                                        status_angsuran : status_angsuran,
                                        jenis_pembayaran : jenis_pembayaran,
                                        amount : amount,
                                        jenispembayaran_id : jenispembayaran_id,
                                        angsuran_id : angsuran_id,
                                        tgl_pembayaran : tgl_pembayaran,
                                        no_rek : no_rek,
                                        bank : bank,
                                        penyedia_layanan : penyedia_layanan,
                                        jenis_transaksi : jenis_transaksi,
                                        nasabah_id : nasabah_id,
                                        norek_giro : norekGiro,
                                    }]  
                                response.ok(data, res)
                                console.log('Transaction Complete.');
                        });
                    });
                });
            });
        });
    /* End transaction */
}

exports.pembayaranTransfer = function (req, res) {
   
    let transfer_id = req.body.transfer_id;
    let no_rek = req.body.no_rek;
    let angsuran_id = req.body.angsuran_id;
    let pengajuan_id = req.body.pengajuan_id;
    let amount = req.body.amount;
    let tgl_pembayaran = NOW();
    let bank = req.body.bank;
    let status = "Lunas";
    let norek_giro = req.body.norek_giro;
    
    /* Begin transaction */
    connection.beginTransaction(function(err) {
        if (err) { 
            throw err; 
        }
        connection.query('UPDATE transfer SET status = ? WHERE transfer_id = ? and no_rek = ?',
        [status,transfer_id,no_rek], 
        function(err, result) {
            if (err) { 
                connection.rollback(function() {
                    throw err;
                });
            }  
            connection.query('UPDATE angsuran SET status = ?, amount = ? WHERE angsuran_id = ? and pengajuan_id = ?',
            [status,amount,angsuran_id, pengajuan_id], 
            function(err, result) {
                if (err) { 
                    connection.rollback(function() {
                        throw err;
                    });
                }        
                connection.commit(function(err) {
                    if (err) { 
                        connection.rollback(function() {
                            throw err;
                        });
                    }
                    console.log('Transaction Complete.');
                    const data = [{
                        transfer_id : transfer_id,
                        amount : amount,
                        no_rek : no_rek,
                        angsuran_id : angsuran_id,
                        pengajuan_id : pengajuan_id,
                        status : status,
                        tgl_pembayaran : tgl_pembayaran,
                        norek_giro : norek_giro,
                        bank : bank,
                    }]
                    response.ok(data, res)
                });
            });
        });
    }); /* End transaction */  
};

exports.pembayaranVA = function (req, res) {
    
    let va_id = req.body.va_id;
    let no_va = req.body.no_va;
    let amount = req.body.amount;
    let angsuran_id = req.body.angsuran_id;
    let pengajuan_id = req.body.pengajuan_id;
    let bank = req.body.bank;
    let tgl_pembayaran = NOW();
    let status = "Lunas";
    
    /* Begin transaction */
    connection.beginTransaction(function(err) {
        if (err) { 
            throw err; 
        }
        connection.query('UPDATE virtual_account SET status = ? WHERE va_id = ? and no_va = ?',
        [status,va_id,no_va], 
        function(err, result) {
            if (err) { 
                connection.rollback(function() {
                    throw err;
                });
            }  
            connection.query('UPDATE angsuran SET status = ?, amount = ? WHERE angsuran_id = ? and pengajuan_id = ?',
            [status,amount,angsuran_id,pengajuan_id], 
            function(err, result) {
                if (err) { 
                    connection.rollback(function() {
                        throw err;
                    });
                }        
                connection.commit(function(err) {
                    if (err) { 
                        connection.rollback(function() {
                            throw err;
                        });
                    }
                    console.log('Transaction Complete.');
                    const data = [{
                        va_id : va_id,
                        no_va : no_va,
                        amount : amount,
                        angsuran_id : angsuran_id,
                        pengajuan_id : pengajuan_id,
                        status : status,
                        tgl_pembayaran : tgl_pembayaran,
                        bank : bank,
                    }]
                    response.ok(data, res)
                });
            });
        });
    }); /* End transaction */  
};