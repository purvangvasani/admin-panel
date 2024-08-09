const TransactionController = require("../controller/transactionRequest/transactionRequest.controller");
const helper = require('../utility');

module.exports = function (router) {
    router.post('/transactionRequest/getAll', helper.util.authenticationMiddleware, TransactionController.getAll);
    router.post('/transactionRequest/addTransaction', TransactionController.addTransaction);
    router.post('/transactionRequest/updateTransaction', helper.util.authenticationMiddleware, TransactionController.updateTransaction);
    router.post('/transactionRequest/getbyMerchantId', TransactionController.getAll);
}