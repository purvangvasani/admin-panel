const AccountDetailController = require("../controller/account-details.controller");
const helper = require('../utility');
const upload = require('../../config/multerConfig');

module.exports = function (router) {
    router.post('/account/getAccountDetails', helper.util.authenticationMiddleware, AccountDetailController.getAccountDetails);
    router.post('/account/add', helper.util.authenticationMiddleware, AccountDetailController.add);
    router.post('/account/getAll', helper.util.authenticationMiddleware, AccountDetailController.getAll);
    router.post('/account/deleteById', helper.util.authenticationMiddleware, AccountDetailController.deleteById);
    router.post('/account/update', helper.util.authenticationMiddleware, AccountDetailController.update);
    // router.post('/account/update', helper.util.authenticationMiddleware, upload.single('file'), AccountDetailController.update);

}