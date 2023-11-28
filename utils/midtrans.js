const midtransClient = require('midtrans-client');

exports.coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLIENT_KEY 
});