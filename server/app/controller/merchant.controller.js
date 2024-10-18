const MerchantService = require('../services/merchant.service')
const helper = require('../utility');
const error = require('../utility/error');

module.exports = {
    getAll,
    add,
    update,
    deleteById,
    getById,
    getMerchantSummaryById,
    getMerchantForAccounts,
    getMerchantPaymentDetails
}

async function getAll(req, res, next) {
    try {
        let result = await MerchantService.getAll(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}
async function getMerchantForAccounts(req, res, next) {
    try {
        let result = await MerchantService.getMerchantForAccounts(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}
async function getMerchantPaymentDetails(req, res, next) {
    try {
        let result = await MerchantService.getMerchantPaymentDetails(req.params.id);
        res.json(result);
    } catch (e) {
        res.status(error.status.NotFound).json({
            error: error.message.BadRequest,
            message: error.message.BadRequest
        });
    }
}
async function add(req, res, next) {
    try {
        if (req && req.body && req.body.merchantname) {
            let criteria = req.body;
            criteria['userId'] = req.headers.userid;
            let result = await MerchantService.add(criteria);
            res.json(result);
        } else {
            res.json({
                success: false,
                message: 'Please Provide Merchant Name!'
            })
        }
    } catch (e) {
        res.json(e);
    }
}

async function update(req, res, next) {
    try {
        let criteria = req.body;
        criteria['userId'] = req.headers.userid;
        let result = await MerchantService.update(criteria);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function deleteById(req, res, next) {
    try {
        if (req && req.body && req.body.merchantId) {
            let criteria = req.body;
            let result = await MerchantService.deleteById(criteria);
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
        if (req.body && req.body.merchantId) {
            let result = await MerchantService.getById(req.body);
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
async function getMerchantSummaryById(req, res, next) {
    try {
        if (req.body && req.body.merchantId) {
            let result = await MerchantService.getMerchantSummaryById(req.body);
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