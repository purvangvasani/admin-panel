const TransactionController = require("../controller/transactionRequest/transactionRequest.controller");

module.exports = function (router) {
    router.post('/transactionRequest/getAll', TransactionController.getAll);
    router.post('/transactionRequest/addTransaction', TransactionController.addTransaction);
    router.post('/transactionRequest/updateTransaction', TransactionController.updateTransaction);
}