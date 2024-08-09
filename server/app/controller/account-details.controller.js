const AccountDetailsService = require('../services/account-details.service')

module.exports = {
    add,
    update,
    getAccountDetails,
    deleteById,
    getAll
}

async function getAll(req, res, next) {
    try {
        let result = await AccountDetailsService.getAll(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function getAccountDetails(req, res, next) {
    try {
        let result = await AccountDetailsService.getAccountDetails(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function deleteById(req, res, next) {
    try {
        if (req && req.body && req.body.accountId) {
            let criteria = req.body;
            let result = await AccountDetailsService.deleteById(criteria);
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

async function add(req, res, next) {
    try {
        if (req && req.body && req.body.mode) {
            let criteria = req.body;
            criteria['userId'] = req.headers.userid;
            let result = await AccountDetailsService.add(criteria);
            res.json(result);
        } else {
            res.json({
                success: false,
                message: 'Please Provide Account Mode!'
            })
        }
    } catch (e) {
        res.json(e);
    }
}

async function update(req, res, next) {
    try {
        if (req && req.body && req.body.mode) {
            let criteria = req.body;
            criteria['userId'] = req.headers.userid;
            let result = await AccountDetailsService.update(criteria);
            res.json(result);
        } else {
            res.json({
                success: false,
                message: 'Please Provide Account mode!'
            })
        }
    } catch (e) {
        res.json(e);
    }
}