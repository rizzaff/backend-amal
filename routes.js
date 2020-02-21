'use strict';

module.exports = function(app) {
    const todoList = require('./controller');
    const kendaraan = require('./kendaraanController');
    const cabang = require('./cabangController');
    const nasabah = require('./nasabahController');
    const uangMuka = require('./uangMukaController');
    const pengajuan = require('./pengajuanController');
    const angsuran = require('./angsuranController');
    const auth = require('./authController');

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
    
    app.get('/kendaraan/merk',kendaraan.viewMerk);
    app.get('/kendaraan/merk/:merkId',kendaraan.viewDetailMerk);
    app.get('/kendaraan/list/:merk_id/:status',kendaraan.viewList);
    app.get('/kendaraan/list/warna/:tipe/:status',kendaraan.viewListWarna);
    app.get('/kendaraan/list/:tipeId',kendaraan.viewDetailKendaraan);
    app.post('/merk',kendaraan.createMerk);
    app.post('/kendaraan/list',kendaraan.createKendaraanList);
    app.post('/kendaraan/nasabah',kendaraan.createKendaraanNasabah);
    // app.post('/kendaraan/status',kendaraan.createStatusKendaraan);
    
    app.post('/nasabah/pegawai',nasabah.createPegawai);
    app.post('/nasabah/mikro',nasabah.createMikro);
    app.post('/nasabah/tipe',nasabah.createTipeNasabah);
    app.post('/nasabah',nasabah.createNasabah);
    
    app.post('/uangmuka/jaminan',uangMuka.createJaminan);
    app.post('/uangmuka/cash',uangMuka.createCash);
    app.post('/uangmuka/tabemas',uangMuka.createTabEmas);
    app.post('/uangmuka',uangMuka.createUangMuka);
    
    app.post('/cabang',cabang.createCabang);
    
    app.post('/pengajuan',pengajuan.createPengajuan);
    app.post('/pengajuan/buatAngsuran',angsuran.createAngsuran);
    app.put('/pengajuan/verifikasi',pengajuan.verifikasiPengajuan);
    
    app.put('/pembayaran/transfer/:angsuranID',todoList.pembayaranTransfer);
    app.put('/pembayaran/dompet/:angsuranID',todoList.pembayaranDompet);
    app.put('/topup/:customerID',todoList.topUpDompet);
    
};