'use strict';

module.exports = function(app) {
    const todoList = require('./controller');
    const auth = require('./authController');

    app.post('/',todoList.index);
    app.post('/cabang',todoList.showCabang);
    app.post('/cabang/:cabangId',todoList.showCabangById);
    app.post('/merk',todoList.showMerk); 
    app.post('/merk/:merkId',todoList.showMerkById); 
    app.post('/kendaraan',todoList.showKendaraan); 
    app.post('/kendaraan/:kendaraanID',todoList.showKendaraanById);
    app.post('/pengajuan/:pengajuanId',todoList.showPengajuanById);
    app.post('/pengajuan',todoList.showPengajuan);
    app.post('/login',auth.login);
    app.post('/cabang/create',todoList.createCabang);
    app.post('/merk/create',todoList.createMerk);
    app.post('/kendaraan/create',todoList.createKendaraan);
    app.post('/pengajuan/create',todoList.createPengajuan);
    app.post('/nasabah/pengajuan/create',todoList.createPengajuanNasabah);
    app.post('/nasabah/pengajuan/pembayarandp',todoList.createPembayaranDP);
    app.post('/nasabah/create',todoList.createNasabah);
    
    app.put('/cabang/:cabangId',todoList.updateCabang);
    app.put('/merk/:merkId',todoList.updateMerk);
    app.put('/kendaraan/:kendaraanID',todoList.updateKendaraan);
    app.put('/pengajuan/:pengajuanID',todoList.verifikasiPengajuan);
    app.put('/pembayaran/transfer/:angsuranID',todoList.pembayaranTransfer);
    app.put('/pembayaran/dompet/:angsuranID',todoList.pembayaranDompet);
    app.put('/topup/:customerID',todoList.topUpDompet);  
};