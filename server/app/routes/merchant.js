const MerchantController = require("../controller/merchant.controller");
const helper = require('../utility');

module.exports = function (router) {
    router.post('/merchant/getAll', helper.util.authenticationMiddleware, MerchantController.getAll);
    router.post('/merchant/getById', MerchantController.getById);
    router.post('/merchant/add', helper.util.authenticationMiddleware, MerchantController.add);
    router.post('/merchant/update', helper.util.authenticationMiddleware, MerchantController.update);
    router.post('/merchant/deleteById', helper.util.authenticationMiddleware, MerchantController.deleteById);
    router.post('/merchant/getMerchantSummaryById', MerchantController.getMerchantSummaryById);
    router.post('/merchant/getMerchantForAccounts', MerchantController.getMerchantForAccounts);
    
    router.get('/merchant/:id', MerchantController.getMerchantPaymentDetails);


}