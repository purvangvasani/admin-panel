const TransactionCollection = require('../../models/transaction-request');
const helpers = require('../../utility');
const helper = require('../../middleware/utils');

module.exports = {
    getAll,
    addTransaction,
    updateTransaction,
}

function getAll(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            let totalPages = 0;
            const page = parseInt(criteria.pageQuery) || 1; // Page number from the request query, default is 1
            const pageSize = criteria.pageSize || 5; // Number of records per page
            let totalCount = 0;

            if (criteria?.type) {
                let condition = [];
                condition.push({ $match: { type: criteria.type } });
                if (criteria?.merchantId) {
                    condition.push({ $match: { merchant_id: atob(criteria.merchantId) } });
                }

                if (criteria.pageQuery) {

                    totalCount = await TransactionCollection.countDocuments({ type: criteria.type });
                    totalPages = Math.ceil(totalCount / pageSize);

                    const skip = (page - 1) * pageSize;
                    condition.push({ $skip: skip }, { $limit: pageSize })
                }

                let transactions = await TransactionCollection.aggregate(condition).exec();
                // let transactions = PREDEFINEDDATA.data;
                if (transactions && !transactions.length) {
                    return reject({ success: false, status: helpers.error.status.Forbidden, message: 'No Data found' });
                }
                resolve({ success: true, message: 'Transaction Requests fetch successfully.', data: transactions, currentPage: page, totalPages, totalCount });
            } else {
                reject({ success: false, message: 'Transaction criteria is not provided' });
                return;
            }
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);

}
function addTransaction(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {

            let isExists = await TransactionCollection.findOne({ transaction_id: criteria.transaction_id }).lean().exec();
            if (isExists && isExists.merchant_id) {
                reject({ success: false, message: 'You cannot add duplicate transaction Id' });
                return;
            }

            let Id = await helper.generateCounterId('transactionRequest', 'id', 'TRR_');
            if (Id) {
                if (criteria.merchantId) {
                    criteria.merchant_id = atob(criteria.merchantId);
                    delete criteria.merchantId;
                }
                if (criteria.transactionId) {
                    criteria.transaction_id = criteria.transactionId;
                    delete criteria.transactionId;
                }
                const transactionData = {};
                const dynamicFields = {};
                const staticFields = [
                    'user_id', 'merchant_id', 'transaction_id', 'accountName',
                    'accountNumber', 'amount', 'operationType', 'status',
                    'type', 'comments'
                ];
                Object.keys(criteria).forEach(key => {
                    if (staticFields.includes(key)) {
                        transactionData[key] = criteria[key];
                    } else {
                        dynamicFields[key] = criteria[key];
                    }
                });
                transactionData.dynamicFields = dynamicFields;
                // let transactionData = await TransactionCollection({
                //     user_id: criteria.user_id,
                //     merchant_id: criteria.merchantId,
                //     transaction_id: criteria.transactionId,
                //     accountName: criteria.accountName,
                //     accountNumber: criteria.accountNumber,
                //     amount: criteria.amount,
                //     operationType: criteria.operationType,
                //     status: criteria.status,
                //     type: criteria.type,
                //     comments: criteria.comments,
                // }); 
                const newTransaction = new TransactionCollection(transactionData);
                newTransaction['id'] = Id;
                await newTransaction.save();
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

function updateTransaction(criteria) {
    let promiseFunction = async (resolve, reject) => {
        if (criteria && criteria._id) {
            let q = { _id: criteria._id };
            try {
                let result = await TransactionCollection.findOneAndUpdate(q, criteria, { upsert: false }).exec();
                result = result.toJSON();
                resolve({ success: true, message: 'Transaction updated successfully!', data: result });
            } catch (err) {
                reject({ success: false, message: err && err.message ? err.message : helper.error.message.InternalServerError, error: err });
            }
        } else {
            reject({ success: false, message: helper.error.message.insufficientData, error: '' });
        }
    }
    return new Promise(promiseFunction);
}

