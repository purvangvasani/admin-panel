const BankController = require("../controller/banks/banks.controller");
const helper = require('../utility');

module.exports = function (router) {
    router.post('/banks/getAll', helper.util.authenticationMiddleware, BankController.getAll);
    router.post('/banks/getBankID', helper.util.authenticationMiddleware, BankController.getBankID);
    router.post('/banks/getById', helper.util.authenticationMiddleware, BankController.getById);
    router.post('/banks/add', helper.util.authenticationMiddleware, BankController.add);
    router.post('/banks/update', helper.util.authenticationMiddleware, BankController.update);
    router.post('/banks/delete', helper.util.authenticationMiddleware, BankController.deleteById);
}