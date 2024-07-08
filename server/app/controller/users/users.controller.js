const UserService = require('../../services/users/users.service')

module.exports = {
    getUsers,
    getByUserId,
    update
}

async function getUsers(req, res, next) {
    try {
        let result = await UserService.getUsers(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function getByUserId(req, res, next) {
    try {
        let result = await UserService.getByUserId(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function update(req, res, next) {
    try {
        let result = await UserService.update(req);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}