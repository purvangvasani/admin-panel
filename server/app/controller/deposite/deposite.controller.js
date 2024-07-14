const DepositeService = require('../../services/deposite/deposite.service');

module.exports = {
    getAll
}

async function getAll(req, res, next) {
    try {
        let result = await DepositeService.getAll();
        res.json(result);
    } catch (e) {
        res.json(e);
    }
} 