const TransactionService = require('../../services/transactionRequest/transactionRequest.service');

module.exports = {
    getAll,
    addTransaction,
}

async function getAll(req, res, next) {
    try {
        let result = await TransactionService.getAll();
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