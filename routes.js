'use strict';

module.exports = function(app) {
    const todoList = require('./controller');
    const kendaraan = require('./kendaraanController');
    const cabang = require('./cabangController');
    const emas = require('./emasController');
    const nasabah = require('./nasabahController');
    const pekerjaan = require('./pekerjaanController');
    const uangMuka = require('./uangMukaController');
    const pengajuan = require('./pengajuanController');
    const journey = require('./journeyController');
    const angsuran = require('./angsuranController');
    const auth = require('./authController');
    const uploadGambar = require('./uploadGambar');
    const pembayaran = require('./pembayaranController');
    const gcash = require('./gcashController');

    app.post('/',todoList.index);
    
    // app.post('/cabang',todoList.showCabang);
    // app.post('/cabang/:cabangId',todoList.showCabangById);
    // app.post('/cabang/create',todoList.createCabang);
    // app.put('/cabang/:cabangId',todoList.updateCabang);
    
    // app.post('/merk',todoList.showMerk); 
    // app.post('/merk/:merkId',todoList.showMerkById); 
    // app.post('/merk/create',todoList.createMerk);
    // app.put('/merk/:merkId',todoList.updateMerk);
    
    // app.post('/pengajuan/:pengajuanId',todoList.showPengajuanById);
    // app.post('/pengajuan',todoList.showPengajuan);
    // app.post('/pengajuan/create',todoList.createPengajuan);
    // app.put('/pengajuan/:pengajuanID',todoList.verifikasiPengajuan);
    
    app.post('/login',auth.login);
    
    // app.post('/kendaraan/create',todoList.createKendaraan);
    // app.post('/kendaraan',todoList.showKendaraan); 
    // app.post('/kendaraan/:kendaraanID',todoList.showKendaraanById);
    // app.put('/kendaraan/:kendaraanID',todoList.updateKendaraan);
    app.post('/pembayaran/getpembayaran', pembayaran.getPembayaranAngsuran);
    app.post('/pembayaran/inquiryva', pembayaran.createInquiryVA);
    app.post('/pembayaran/inquirygc', pembayaran.createInquiryGC);

    app.post('/gcash/getbalance', pembayaran.getGcashBalance);
    app.post('/gcash/create', pembayaran.PembentukanNomorGcash);
    app.post('/gcash/transaksi', pembayaran.pembayaranGcash);

    app.get('/kendaraan/merk/:kategori',kendaraan.viewMerk);
    app.get('/kendaraan/merk/cari/:kategori/:cari',kendaraan.cariMerk);
    app.get('/kendaraan/merk/detail/:merkId',kendaraan.viewDetailMerk);
    app.get('/kendaraan/list/:merk_id/:status',kendaraan.viewList);
    app.get('/kendaraan/list/warna/:tipe/:status',kendaraan.viewListWarna);
    app.get('/kendaraan/list/:tipeId',kendaraan.viewDetailKendaraan);
    app.get('/kendaraan/list/cari/:merk_id/:status/:cari',kendaraan.cariTipe);
    
    app.post('/merk',kendaraan.createMerk);
    app.post('/kendaraan/list',kendaraan.createKendaraanList);
    app.post('/kendaraan/nasabah',kendaraan.createKendaraanNasabah);
    // app.post('/kendaraan/status',kendaraan.createStatusKendaraan);
    
    app.post('/pegawai',pekerjaan.createPegawai);
    app.post('/mikro',pekerjaan.createMikro);

    app.post('/nasabah',nasabah.createNasabah);
    
    app.get('/nasabah',nasabah.viewNasabahList);
    app.post('/nasabah/cari',nasabah.cariNasabahList);
    app.get('/nasabah/:nasabah_id',nasabah.viewNasabahDetail);
    app.post('/nasabah/get/kendaraan',nasabah.viewKendaraanNasabah);
    app.post('/nasabah/get/cash',nasabah.viewDpCash);
    app.post('/nasabah/get/jaminan',nasabah.viewDpJaminan);
    app.post('/nasabah/get/emas',nasabah.viewDpEmas);
    app.post('/nasabah/get/mikro',nasabah.viewMikro);
    app.post('/nasabah/get/pegawai',nasabah.viewPegawai);
    
    // app.post('/nasabah/kendaraan',nasabah.viewKendaraanNasabah);
    
    // app.get('/nasabah/cash/:nasabah_id',nasabah.viewDpCash);
    // app.get('/nasabah/emas/:nasabah_id',nasabah.viewDpEmas);
    // app.get('/nasabah/jaminan/:nasabah_id',nasabah.viewDpJaminan);
    // app.get('/nasabah/mikro/:nasabah_id',nasabah.viewMikro);
    // app.get('/nasabah/pegawai/:nasabah_id',nasabah.viewPegawai);
    
    app.post('/uploadDokumen', uploadGambar.uploadDokumen)
    
    app.post('/uangmuka/jaminan',uangMuka.createJaminan);
    app.post('/uangmuka/cash',uangMuka.createCash);
    app.post('/uangmuka/tabemas',uangMuka.createTabEmas);
    
    app.post('/cabang',cabang.createCabang);
    app.get('/cabang/view',cabang.viewCabang);
    app.get('/cabang/view/:cari',cabang.cariCabang);
    
    app.post('/cabang/terdekat',cabang.viewCabangTerdekat);
    
    app.get('/emas/user/:userid',emas.viewEmasUser);
    app.get('/emas/konversi/:satuan',emas.viewEmasKonversi);
    
    app.get('/pengajuan/:user_id',pengajuan.viewPengajuan);
    
    app.post('/pengajuan/verifikasi',pengajuan.verifikasiPengajuan);
    app.put('/pengajuan/lunas',pengajuan.lunasPengajuan);
    
    app.post('/kendaraan/bpkb',kendaraan.inputBpkb);
    
    app.get('/gcash/:user_id',gcash.viewGcash);
    
    app.get('/journey/:user_id',journey.viewJourney);
    
    app.post('/pengajuan',pengajuan.createPengajuan);
    app.post('/pengajuan/buatAngsuran',angsuran.createAngsuran);
    app.put('/pengajuan/verifikasi',pengajuan.verifikasiPengajuan);
    app.put('/pengajuan/tolak',pengajuan.tolakPengajuan);
    
    app.put('/pembayaran/transfer/:angsuranID',todoList.pembayaranTransfer);
    app.put('/pembayaran/dompet/:angsuranID',todoList.pembayaranDompet);
    app.put('/pembayaran/autodebet',pembayaran.autodebet);
    app.put('/topup/:customerID',todoList.topUpDompet);
    
    app.post('/angsuran/hapus',angsuran.hapusAngsuran);
    app.post('/dpcash/hapus',uangMuka.hapusCash);
    app.post('/dpjaminan/hapus',uangMuka.hapusJaminan);
    app.post('/dptabemas/hapus',uangMuka.hapusTabEmas);
    app.post('/kendaraan/nasabah/hapus',kendaraan.hapusKendaraanNasabah);
    app.post('/mikro/hapus',pekerjaan.hapusMikro);
    app.post('/nasabah/hapus',nasabah.hapusNasabah);
    app.post('/pengajuan/hapus',pengajuan.hapusPengajuan);
    app.post('/pegawai/hapus',pekerjaan.hapusPegawai);
    
};