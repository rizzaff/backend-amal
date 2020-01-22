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
    let cabangID = req.params.cabangId;

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
    let no_telp = req.body.noTelp;

    connection.query('INSERT INTO cabang (nama,alamat,no_telp) VALUES (?,?,?)',
        [nama, alamat, no_telp],
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
    let cabangID = req.params.cabangId;
    let no_telp = req.body.noTelp;

    connection.query('UPDATE `cabang` SET `nama`=?,`alamat`=? , `no_telp`=? WHERE `cabangID`=?',
        [nama, alamat, cabangID, no_telp],
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

    let customerID = uuidv4().slice(24,36);
    let pengajuanID = uuidv4().slice(24,36);
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
        let angsuranID = uuidv4().slice(24,36);

        connection.query('INSERT INTO `angsuran`(`angsuranID`, `pengajuanID`, angsuran, tanggal, status) VALUES (?,?,?,?,?)',
            [angsuranID, pengajuanID, angsuran, tanggal, status],);

        connection.query('INSERT INTO `pembayaran`(`angsuranID`) VALUES (?)',
            [angsuranID],);
    }

};

exports.showPengajuan = function (req, res) {

    let pengajuanID = req.params.pengajuanID;
    let customerID = req.body.customerID;
    let username = uuidv4().slice(24,36);
    let password = uuidv4().slice(24,36);
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
    let username = uuidv4().slice(24,36);
    let password = uuidv4().slice(24,36);
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

exports.createNasabah = function (req, res){
    console.log("====== Run endpoint /nasabah/create - createNasabah =======");
    let nasabah_id = uuidv4().slice(24,36);
    let nama =	req.body.nama
    let tempat_lahir =	req.body.tempat_lahir
    let tanggal_lahir =	req.body.tanggal_lahir
    let jenis_kelamin =	req.body.jenis_kelamin
    let status = req.body.status
    let nama_ibu = req.body.nama_ibu
    let no_ktp = req.body.no_ktp
    let foto_ktp = req.body.foto_ktp
    let alamat = req.body.alamat
    let provinsi = req.body.provinsi
    let kota = req.body.kota
    let kabupaten = req.body.kabupaten
    let kecamatan = req.body.kecamatan
    let kelurahan = req.body.kelurahan

    console.log("===== Insert data Jenis Nasabah =====");
    connection.query('INSERT INTO `nasabah`(nasabah_id, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status, nama_ibu, no_ktp, foto_ktp, alamat, provinsi, kota, kabupaten, kecamatan, kelurahan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [nasabah_id, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status, nama_ibu, no_ktp, foto_ktp, alamat, provinsi, kota, kabupaten, kecamatan, kelurahan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    }

exports.createPengajuanNasabah = function (req, res) {
    console.log("====== Run endpoint /nasabah/pengajuan/create - createPengajuanNasabah =======");
    let jenisNasabah = req.body.jenisNasabah;
    let tipenasabah_id = uuidv4().slice(24,36);

    if (jenisNasabah == "M") {
        console.log("===== pengajuan Nasabah Jenis Nasabah Mikro =====");
        //-------------------mikro------------------------//
        let mikro_id = uuidv4().slice(24,36); 
        let pegawai_id = "";
        let nama = req.body.nama;	
        let bidang_usaha = req.body.bidang_usaha;
        let lama_usaha = req.body.lama_usaha;	
        let status_usaha = req.body.status_usaha;
        let jarak = req.body.jarak;	
        let jenis = req.body.jenis;
        let alamat = req.body.alamat;	
        let provinsi = req.body.provinsi;
        let kabupaten = req.body.kabupaten;
        let kecamatan = req.body.kecamatan;
        let kelurahan = req.body.kelurahan;
        let kode_pos = req.body.kode_Pos;

        console.log("===== Insert data Jenis Nasabah Mikro =====");
        connection.query('INSERT INTO `mikro`(mikro_id, nama, bidang_usaha, lama_usaha, status_usaha, jarak, jenis, alamat, provinsi, kabupaten, kecamatan, kelurahan, kode_pos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [mikro_id, nama, bidang_usaha, lama_usaha, status_usaha, jarak, jenis, alamat, provinsi, kabupaten, kecamatan, kelurahan, kode_pos],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    response.ok(rows, res)
                }
            });
    } else {
        console.log("===== pengajuan Nasabah Jenis Nasabah Pegawai =====");
        //--------------------pegawai----------------------//
        let pegawai_id = uuidv4().slice(24,36);
        let mikro_id = ""; 
        let nama = req.body.nama; 	
        let nama_perusahaan = req.body.nama_perusahaan;
        let nama_pimpinan = req.body.nama_pimpinan;	
        let nomor_sk = req.body.nomor_sk;
        let no_telp = req.body.no_telp;
        let status = req.body.status;
        let jenis_perusahaan = req.body.jenis_perusahaan;
        let tgl_pensiun = req.body.tgl_pensiun;
        let lama_kerja 	= req.body.lama_kerja;
        let alamat = req.body.alamat;
        let provinsi = req.body.provinsi;
        let kabupaten =	req.body.kabupaten;
        let kecamatan =	req.body.kecamatan;
        let kelurahan =	req.body.kelurahan;
        let kode_pos =	req.body.kode_pos;
        let kartu_identitas = req.body.kartu_identitas;
        let sk_pegawai =req.body.sk_pegawai;

        console.log("===== Insert data Jenis Nasabah Pegawai =====");
        connection.query('INSERT INTO `pegawai`(pegawai_id, nama, nama_perusahaan, nama_pimpinan, nomor_sk, no_telp, status, jenis_perusahaan, tgl_pensiun, lama_kerja, alamat, provinsi, kabupaten, kecamatan, kelurahan, kode_pos, kartu_identitas, sk_pegawai) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [pegawai_id, nama, nama_perusahaan, nama_pimpinan, nomor_sk, no_telp, status, jenis_perusahaan, tgl_pensiun, lama_kerja, alamat, provinsi, kabupaten, kecamatan, kelurahan, kode_pos, kartu_identitas, sk_pegawai],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    response.ok(rows, res)
                }
            });
    }

    connection.query('INSERT INTO `tipe_nasabah`(`tipenasabah_id`,`pegawai_id`,`mikro_id`) VALUES (?,?,?)',
        [tipenasabah_id, pegawai_id, mikro_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
    });
};

exports.createPembayaranDP = function(req, res){
    console.log("====== Run endpoint /nasabah/pengajuan/pembayarandp - createPembayaranDP =======");
    let jenisDP = req.body.jenisDP
    let uangmuka_id = uuidv4().slice(24,36);

    if (jenisDP == "TE") {
        console.log("====== Run endpoint /nasabah/pengajuan/pembayarandp tipe tabungan emas - createPembayaranDP =======");
        let tabemas_id = uuidv4().slice(24,36);
        let cash_id = "";
        let jaminan_id = ""; 
        
        connection.query('INSERT INTO `tab_emas`(tabemas_id,no_rek,saldo) VALUES (?,?,?)',
        [tabemas_id,no_rek,saldo],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    } else if (jenisDP = "J") {
        console.log("====== Run endpoint /nasabah/pengajuan/pembayarandp tipe Jaminan - createPembayaranDP =======");
        let jaminan_id = uuidv4().slice(24,36);
        let cash_id = "";
        let tabemas_id = "";

        connection.query('INSERT INTO `jaminan`(jaminan_id, jenis, merk, tipe, harga, jenis_perhiasan, jumlah, berat_kotor, berat_bersih, karat, taksiran, keterangan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [jaminan_id, jenis, merk, tipe, harga, jenis_perhiasan, jumlah, berat_kotor, berat_bersih, karat, taksiran, keterangan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    } else {
        console.log("====== Run endpoint /nasabah/pengajuan/pembayarandp tipe Cash - createPembayaranDP =======");
        let cash_id = uuidv4().slice(24,36);
        let tabemas_id = "";
        let jaminan_id = "";

        connection.query('INSERT INTO `cash`(cash_id, cash) VALUES (?,?)',
        [cash_id, cash],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    }

    console.log("====== Run endpoint /nasabah/pengajuan/pembayarandp - insert into tabel status_uangmuka =======");
    connection.query('INSERT INTO `status_uangmuka`(uangmuka_id, cash_id, tabemas_id, jaminan_id) VALUES (?,?,?,?)',
        [tipenasabah_id, pegawai_id, mikro_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
    });
}

exports.createInquiry = function(req,res){
    console.log("====== Run endpoint /inquiry/va - createPembayaranAngsuran =======");
    let inquiry = req.body.inquiry;
    let status_angsuran = "request_bayar";
    let jenis_pembayaran = req.body.jenis_pembayaran;

    // tabel angsuran = angsuran_id, pengajuan_id, jenispembayaran_id, jatuh_tempo, status_angsuran
    //------------update tabel angsuran, pada status_pembayaran ganti jadi request bayar
    connection.query('UPDATE `angsuran` SET `status_angsuran`=? WHERE `angsuran_id`=?',
        [status_angsuran, angsuran_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });

    //------------update tabel jenis pembayaran tipe pembayaran
    let jenispembayaran_id = req.body.jenispembayaran_id;
    let outlet_id = req.body.outlet_id;
    let va_id =	req.body.va_id;
    let gcash_id =	req.body.gcash_id;
    let tabemas_id =req.body.tabemas_id;

    if (jenis_pembayaran = "VA") {
        connection.query('UPDATE `jenis_pembayaran` SET `va_id`=? WHERE `jenispembayaran_id`=?',
        [jenispembayaran_id, va_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    } else if (jenis_pembayaran = "GC"){
        connection.query('UPDATE `jenis_pembayaran` SET `gcash_id`=? WHERE `jenispembayaran_id`=?',
        [jenispembayaran_id, gcash_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    } else if (jenis_pembayaran = "TE"){
        connection.query('UPDATE `jenis_pembayaran` SET `tabemas_id`=? WHERE `jenispembayaran_id`=?',
        [jenispembayaran_id, tabemas_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    } else {
        connection.query('UPDATE `jenis_pembayaran` SET `outlet_id`=? WHERE `jenispembayaran_id`=?',
        [jenispembayaran_id, outlet_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    }
}

exports.createPembayaranAngsuran = function(req, res){
    console.log("====== Run endpoint /nasabah/pembayaranangsuran - createPembayaranAngsuran =======");
    let pilihanBayar = req.body.pilihanBayar
    let jenispembayaran_id = uuidv4().slice(24,36);

    if (jenisDP == "TE") {
        console.log("====== Run endpoint /nasabah/pembayaranangsuran tipe tabungan emas - createPembayaranAngsuran =======");
        let tabemas_id = uuidv4().slice(24,36);
        let gcash_id = "";
        let outlet_id = ""; 
        let va_id = "";

        let no_rek = req.body.no_rek;
        let saldo = req.body.saldo;
        
        connection.query('INSERT INTO `tab_emas`(tabemas_id,no_rek,saldo) VALUES (?,?,?)',
        [tabemas_id,no_rek,saldo],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    } else if (jenisDP == "VA") {
        console.log("====== Run endpoint /nasabah/pembayaranangsuran tipe virtaul Account - createPembayaranAngsuran =======");
        let va_id = uuidv4().slice(24,36);
        let gcash_id = "";
        let tabemas_id = "";
        let outlet_id = "";

        let nomor_virtual = req.body.nomor_virtual;
        let bank = req.body.bank;
        let nominal = req.body.nominal;

        connection.query('INSERT INTO `virtual_account`(va_id, nomor_virtual, bank, nominal) VALUES (?,?,?,?)',
        [va_id, nomor_virtual, bank, nominal],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    } else if (jenisDP == "GC") {
        console.log("====== Run endpoint /nasabah/pembayaranangsuran tipe gcash - createPembayaranAngsuran =======");
        let gcash_id = uuidv4().slice(24,36);
        let tabemas_id = "";
        let va_id = "";
        let outlet_id = "";

        let nomor_gcash = req.body.nomor_gcash;
        let saldo = req.body.saldo;

        connection.query('INSERT INTO `gcash`(gcash_id, nomor_gcash, saldo) VALUES (?,?)',
        [gcash_id, nomor_cash, saldo],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    } else {
        console.log("====== Run endpoint /nasabah/pembayaranangsuran tipe outlet - createPembayaranAngsuran =======");
        let outlet_id = uuidv4().slice(24,36);
        let tabemas_id = "";
        let va_id = "";
        let gcash_id = "";

        let nomor_transaksi = req.body.nomor_transaksi;
        let nominal = req.body.nominal;

        connection.query('INSERT INTO `outlet`(outlet_id,nomor_transaksi,nominal) VALUES (?,?,?)',
        [outlet_id,nomor_transaksi,nominal],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
    }

    console.log("====== Run endpoint /nasabah/pembayaranangsuran - insert into tabel jenis_pembayaran =======");
    connection.query('INSERT INTO `jenis_pembayaran`(jenispembayaran_id, outlet_id, va_id, gcash_id, tabemas_id) VALUES (?,?,?,?,?)',
        [jenispembayaran_id,outlet_id,va_id,gcash_id,tabemas_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
    });
} 