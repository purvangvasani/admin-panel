const DepositeController = require("../controller/deposite/deposite.controller");

module.exports = function (router) {
    router.get('/deposite/getAll', DepositeController.getAll);
}