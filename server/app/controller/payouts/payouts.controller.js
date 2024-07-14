const PayoutsService = require('../../services/payouts/payouts.service');

module.exports = {
    getAll
}

async function getAll(req, res, next) {
    try {
        let result = await PayoutsService.getAll();
        res.json(result);
    } catch (e) {
        res.json(e);
    }
} 