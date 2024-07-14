const PayoutsController = require("../controller/payouts/payouts.controller");

module.exports = function (router) {
    router.get('/payouts/getAll', PayoutsController.getAll);
}