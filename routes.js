'use strict';

module.exports = function(app) {
    const todoList = require('./controller');
    const auth = require('./authController');

    app.post('/',todoList.index);
    app.post('/gcash/transaksi',todoList.pembayaranGcash);  
    app.post('/pembayaran/getpembayaran',todoList.getPembayaranAngsuran);
    app.post('/merk/create',todoList.createMerk);
    app.post('/gcash/getbalance',todoList.getGcashBalance);
    app.post('/gcash/create',todoList.PembentukanNomorGcash);
    app.post('/gcash/history',todoList.getHistoryGCash);
    app.post('/nasabah/angsuran/history',todoList.getHistoryAngsuran);
    app.post('/pembayaran/inquiryva', todoList.createInquiryVA);
    app.post('/pembayaran/inquirygc',todoList.createInquiryGC);
    app.post('/pembayaran/inquirytf', todoList.createInquiryTF);
    app.post('/pembayaran/transfer', todoList.pembayaranTransfer);
    app.post('/pembayaran/va', todoList.pembayaranVA);
};