'use strict';

const response = require('./res');
const connection = require('./conn');
const uuidv4 = require('uuid/v4');

exports.index = function (req, res) {
    response.ok("welcome to amal backend", res)
};

exports.showCabang = function (req, res) {
    connection.query('SELECT * FROM cabang',
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.showCabangById = function (req, res) {
    let cabangId = req.params.cabangId;

    connection.query('SELECT * FROM cabang WHERE cabangID = ?',
        [cabangID],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createCabang = function (req, res) {

    let nama = req.body.nama;
    let alamat = req.body.alamat;

    connection.query('INSERT INTO cabang (namaCabang, alamatCabang) VALUES (?,?)',
        [nama, alamat],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.updateCabang = function (req, res) {
    let nama = req.body.nama;
    let alamat = req.body.alamat;
    let cabangId = req.params.cabangId;

    connection.query('UPDATE `cabang` SET `namaCabang`=?,`alamatCabang`=? WHERE `cabangID`=?',
        [nama, alamat, cabangId],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.showMerk = function (req, res) {
    connection.query('SELECT * FROM merk',
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.showMerkById = function (req, res) {
    let merkID = req.params.merkId;

    connection.query('SELECT * FROM merk WHERE merkID = ?',
        [merkID],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};


exports.createMerk = function (req, res) {

    let nama = req.body.nama;

    connection.query('INSERT INTO `merk`(`namaMerk`) VALUES (?)',
        [nama],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.updateMerk = function (req, res) {

    let nama = req.body.nama;
    let merkId = req.params.merkId;

    connection.query('UPDATE `merk` SET `namaMerk`=? WHERE `merkID`=?',
        [nama, merkId],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};



exports.showKendaraan = function (req, res) {
    connection.query('SELECT * FROM `datakendaraan`',
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.showKendaraanById = function (req, res) {
    let kendaraanID = req.params.kendaraanID;
    connection.query('SELECT * FROM `datakendaraan`',
        [kendaraanID],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};


exports.createKendaraan = function (req, res) {

    let dp = req.body.dp;
    let tenor = req.body.tenor;
    let besaranAngsuran = req.body.besaranAngsuran;
    let kategori = req.body.kategori;
    let namaKendaraan = req.body.namaKendaraan;
    let merkID = req.body.merkID;

    connection.query('INSERT INTO `datakendaraan`(`dp`, `tenor`, `besaranAngsuran`, `kategori`, `namaKendaran`, `merkID`) VALUES (?,?,?,?,?,?)',
        [dp, tenor, besaranAngsuran, kategori, namaKendaraan, merkID],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.updateKendaraan = function (req, res) {

    let kendaraanID = req.params.kendaraanID;
    let dp = req.body.dp;
    let tenor = req.body.tenor;
    let besaranAngsuran = req.body.besaranAngsuran;
    let kategori = req.body.kategori;
    let namaKendaraan = req.body.namaKendaraan;
    let merkID = req.body.merkID;

    connection.query('UPDATE `datakendaraan` SET `dp`=?,`tenor`=?,`besaranAngsuran`=?,`kategori`=?,`namaKendaran`=?,`merkID`=? WHERE `kendaraanID`=?',
        [dp, tenor, besaranAngsuran, kategori, namaKendaraan, merkID, kendaraanID],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.createPengajuan = function (req, res) {

    let customerID = uuidv4();
    let pengajuanID = uuidv4();
    let kendaraanID = req.body.kendaraanID;
    let cabangID = req.body.cabangID;
    let noKtp = req.body.noKtp;
    let nama = req.body.nama;
    let tempatLahir = req.body.tempatLahir;
    let tanggalLahir = req.body.tanggalLahir;
    let alamat = req.body.alamat;
    let email = req.body.email;
    let phone = req.body.phone;
    let kodePos = req.body.kodePos;
    let ktp = req.body.ktp;
    let kk = req.body.kk;
    let skPegawai = req.body.skPegawai;
    let slipGaji = req.body.slipGaji;
    let rekomendasi = req.body.rekomendasi;
    let noPelanggan = req.body.noPelanggan;
    let angsuran = req.body.angsuran;
    let tanggal = req.body.tanggal;
    let tenor = req.body.tenor;
    let status = false;

    connection.query('INSERT INTO `customer`(`customerID`, `noKTP`, `nama`, `tempatLahir`, `tanggalLahir`, `alamat`, `email`, `phone`, `kodePos`, `KTP`, `KK`, `SKPegawai`, `slipGaji`, `rekomendasi`, `noPelanggan`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [customerID, noKtp, nama, tempatLahir, tanggalLahir, alamat, email, phone, kodePos, ktp, kk, skPegawai, slipGaji, rekomendasi, noPelanggan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });

    connection.query('INSERT INTO `mutasidompet`(`customerID`) VALUES (?)',
        [customerID],);

    connection.query('INSERT INTO `login`(`customerID`) VALUES (?)',
        [customerID],);

    connection.query('INSERT INTO `pengajuan`(`pengajuanID`,`customerID`, `kendaraanID`,`cabangID`,`verifikasi` ) VALUES (?,?,?,?,?)',
        [pengajuanID, customerID, kendaraanID, cabangID, status],);

    for (let i = 0; i < tenor; i++) {
        let angsuranID = uuidv4();

        connection.query('INSERT INTO `angsuran`(`angsuranID`, `pengajuanID`, angsuran, tanggal, status) VALUES (?,?,?,?,?)',
            [angsuranID, pengajuanID, angsuran, tanggal, status],);

        connection.query('INSERT INTO `pembayaran`(`angsuranID`) VALUES (?)',
            [angsuranID],);
    }

};

exports.showPengajuan = function (req, res) {

    let pengajuanID = req.params.pengajuanID;
    let customerID = req.body.customerID;
    let username = uuidv4();
    let password = uuidv4();
    let status = true;

    connection.query('SELECT * FROM `pengajuan`',
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
    });
};

exports.showPengajuanById = function (req, res) {
    let pengajuanID = req.params.pengajuanId;

    connection.query('SELECT * FROM pengajuan WHERE pengajuanID = ?',
        [pengajuanID],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

exports.verifikasiPengajuan = function (req, res) {

    let pengajuanID = req.params.pengajuanID;
    let customerID = req.body.customerID;
    let username = uuidv4();
    let password = uuidv4();
    let status = true;

    connection.query('UPDATE `pengajuan` SET `verifikasi`=? WHERE `pengajuanID`=?',
        [status, pengajuanID],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
    });

    connection.query('UPDATE `login` SET `username`=?,`password`=? WHERE `customerID`=?',
        [username, password, customerID],
    );
};

exports.pembayaranTransfer = function (req, res) {
   
    let angsuranID = req.params.angsuranID;
    let channel = req.body.channel;
    
    connection.query('UPDATE `angsuran` SET `status`=true WHERE `angsuranID`=?',
        [angsuranID],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
    });

    connection.query('UPDATE `pembayaran` SET `channel`=? WHERE `angsuranID`=?',
        [channel, angsuranID],
    );
};

exports.pembayaranDompet = function (req, res) {
   
    let angsuranID = req.params.angsuranID;
    let channel = 'dompet';
    let customerID = req.body.customerID;
    let angsuran = req.body.angsuran;
    
    connection.query('UPDATE `angsuran` SET `status`=true WHERE `angsuranID`=?',
        [angsuranID],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
    });

    connection.query('UPDATE `pembayaran` SET `channel`=? WHERE `angsuranID`=?',
        [channel, angsuranID],
    );

    connection.query('UPDATE `mutasidompet` SET `nilaiMutasi`=((select nilaiMutasi where `customerID`= ? ) - ?) where `customerID`=?',
        [customerID, angsuran, customerID],
    );
};

exports.topUpDompet = function (req, res) {
   
    let customerID = req.params.customerID;
    let channel = req.body.channel;
    let amount = req.body.amount;
    
    connection.query('UPDATE `mutasidompet` SET `channelTopUp`=?,`nilaiMutasi`=((select nilaiMutasi where `customerID`= ? ) - ?) WHERE `customerID`=?',
        [channel,customerID,amount,customerID],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
    });

    connection.query('UPDATE `pembayaran` SET `channel`=? WHERE `angsuranID`=?',
        [channel, angsuranID],
    );

    connection.query('UPDATE `mutasidompet` SET `nilaiMutasi`=((select nilaiMutasi where `customerID`= ? ) - ?) where `customerID`=?',
        [customerID, angsuran, customerID],
    );
};