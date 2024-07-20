const TransactionController = require("../controller/transactionRequest/transactionRequest.controller");

module.exports = function (router) {
    router.get('/transactionRequest/getAll', TransactionController.getAll);
    router.post('/transactionRequest/addTransaction', TransactionController.addTransaction);
}