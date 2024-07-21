const TransactionService = require('../../services/transactionRequest/transactionRequest.service');

module.exports = {
    getAll,
    addTransaction,
    updateTransaction,
}

async function getAll(req, res, next) {
    try {
        let result = await TransactionService.getAll(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}
async function addTransaction(req, res, next) {
    try {
        let result = await TransactionService.addTransaction(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}
async function updateTransaction(req, res, next) {
    try {
        let result = await TransactionService.updateTransaction(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}