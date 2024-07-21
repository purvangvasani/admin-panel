const TransactionCollection = require('../../models/transaction-request');
const ObjectId = require('mongoose').Types.ObjectId;
const PREDEFINEDDATA = require('./predefined-data.json');
const helper = require('../../middleware/utils');

module.exports = {
    getAll,
    addTransaction
}

function getAll() {
    let promiseFunction = async (resolve, reject) => {
        try {
            // let deposites = await DepositeCollection.find({}).exec();
            let transactions = PREDEFINEDDATA.data;
            if (transactions && !transactions.length) {
                return reject({ success: false, status: helpers.error.status.Forbidden, message: 'No Data found' });
            }
            resolve({ success: true, message: 'Transaction Requests fetch successfully.', data: transactions });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);

}
function addTransaction(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {

            // let isExists = await RoleCollection.findOne({ roleName: criteria.roleName }).lean().exec();
            // if (isExists && isExists.rolesId) {
            //     reject({ success: false, message: 'Role already exists' });
            //     return;
            // }

            let Id = await helper.generateCounterId('transactionRequest', 'id', 'TRR_');
            if (Id) {

                let transactionData = await TransactionCollection({
                    user_id: criteria.user_id,
                    merchant_id: criteria.merchantId,
                    transaction_id: criteria.transactionId,
                    account: criteria.account,
                    amount: criteria.amount,
                    operationType: criteria.operationType,
                    status: criteria.status,
                    type: criteria.type,
                    comments: criteria.comments,
                });

                transactionData['id'] = Id;
                await transactionData.save();
                resolve({ success: true, message: criteria.type + ' Request Submitted!' });
            }
            else {
                reject({ success: false, message: 'Some unhandled server error has occurred' });
                return;
            }


        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction)
}

