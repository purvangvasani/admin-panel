const BankService = require('../../services/banks/banks.service')
const helper = require('../../utility');

module.exports = {
    getAll,
    add,
    update,
    deleteById,
    getById
}

async function getAll(req, res, next) {
    try {
        let result = await BankService.getAll(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function add(req, res, next) {
    try {
        if (req && req.body && req.body.bankName && req.body.ref) {
            let criteria = req.body;
            criteria['userId'] = req.headers.userid;
            let result = await BankService.add(criteria);
            res.json(result);
        } else {
            res.json({
                success: false,
                message: 'Please Provide Bank Name and Ref!'
            })
        }
    } catch (e) {
        res.json(e);
    }
}

async function update(req, res, next) {
    try {
        let result = await BankService.update(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function deleteById(req, res, next) {
    try {
        if (req && req.body && req.body.bankId) {
            let criteria = req.body;
            let result = await BankService.deleteById(criteria);
            res.json(result);
        } else {
            res.json({
                success: false,
                status: helper.error.status.InternalServerError,
                message: helper.error.message.insufficientData
            })
        }
    } catch (e) {
        res.json(e);
    }
}

async function getById(req, res, next) {
    try {
        if (req.body && req.body.bankId) {
            let result = await BankService.getById(req.body);
            res.json(result);
        } else {
            res.json({
                success: false,
                status: helper.error.status.InternalServerError,
                message: helper.error.message.insufficientData
            })
        }
    } catch (e) {
        res.json(e);
    }
}