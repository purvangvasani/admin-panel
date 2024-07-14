const RoleController = require("../controller/roles/roles.controller");
const helper = require('../utility');

module.exports = function (router) {
    router.get('/role/getAll', helper.util.authenticationMiddleware, RoleController.getAll);
    router.post('/role/getByRoleId', helper.util.authenticationMiddleware, RoleController.getByRoleId);
    router.post('/role/add',  RoleController.add);
    router.post('/role/update', helper.util.authenticationMiddleware, RoleController.update);
    router.post('/role/delete', helper.util.authenticationMiddleware, RoleController.deleteById);
}