const RoleService = require('../../services/roles/roles.service')
const UserService = require('../../services/users/users.service')
const helper = require('../../utility');

module.exports = {
    getAll,
    getByRoleId,
    add,
    update,
    deleteById,
    runScript
}

async function runScript(req, res, next) {
    try {
        let result = await RoleService.runScript(req.body);
        result = await UserService.runScript(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function getAll(req, res, next) {
    try {
        let result = await RoleService.getAll(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function getByRoleId(req, res, next) {
    try {
        if (req.body && req.body.rolesId) {
            let result = await RoleService.getByRoleId(req.body);
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
        if (req && req.body && req.body.roleName && req.body.displayName) {
            let criteria = req.body;
            let result = await RoleService.add(criteria);
            res.json(result);
        } else {
            res.json({
                success: false,
                message: 'Please Provide Role name and Display name!'
            })
        }
    } catch (e) {
        res.json(e);
    }
}

async function update(req, res, next) {
    try {
        let result = await RoleService.update(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function deleteById(req, res, next) {
    try {
        if (req && req.body && req.body.rolesId) {
            let criteria = req.body;
            let result = await RoleService.deleteById(criteria);
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