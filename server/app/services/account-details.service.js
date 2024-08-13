const helper = require('../middleware/utils');
const AccountDetailsCollection = require('../models/account-details');
const helpers = require('../utility');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    add,
    getAll,
    deleteById,
    update,
    getAccountDetails
}

function getAll(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            let totalPages = 0;
            const page = parseInt(criteria.pageQuery) || 1; // Page number from the request query, default is 1
            const pageSize = criteria.pageSize || 5; // Number of records per page
            let totalCount = 0;

            let condition = [];
            if (criteria) {
                if (criteria._id) {
                    condition.push({ $match: { _id: new ObjectId(criteria._id) } });
                }
                if (criteria.accountId) {
                    condition.push({ $match: { accountId: criteria.accountId } });
                }
                if (criteria.mode) {
                    condition.push({ $match: { mode: criteria.mode } });
                }
            }
            if (criteria && criteria.sort) {
                condition.push({ $sort: criteria.sort });
            } else {
                condition.push({ $sort: { updatedAt: 1 } });
            }
            if (criteria.pageQuery) {

                totalCount = await AccountDetailsCollection.countDocuments({});
                totalPages = Math.ceil(totalCount / pageSize);

                const skip = (page - 1) * pageSize;
                condition.push({ $skip: skip }, { $limit: pageSize })
            }
            let accountData = await AccountDetailsCollection.aggregate(condition).exec();
            if (criteria && !criteria.isMerchantAccount && ((criteria.mode && typeof criteria.mode !== 'object') || criteria._id)) {
                accountData = (accountData && accountData.length) ? accountData[0] : {};
            }
            resolve({ success: true, message: 'success!', data: accountData, currentPage: page, totalPages, totalCount });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);
}

function add(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            if (criteria.accountNumber != null) { // Check if accountNumber is not null or undefined
                try {
                    let isExists = await AccountDetailsCollection.findOne({ accountNumber: criteria.accountNumber }).lean().exec();
                    if (isExists) {
                        reject({ success: false, message: 'Account with Account Number already exists' });
                        return
                    }
                } catch (error) {
                    console.error('Error checking account existence:', error);
                }
            }
            if (!new RegExp(/^[0-9]{9,18}$/).test(criteria.accountNumber)) {
                reject({ success: false, message: 'Account Number Validation Failed!' });
                return;
            }
            if (!new RegExp(/[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/).test(criteria.ifsc)) {
                reject({ success: false, message: 'IFSC Validation Failed!' });
                return;
            }

            let accountId = await helper.generateCounterId('accountDetails', 'accountId', 'QQAD_');
            if (accountId) {

                let accountData = await AccountDetailsCollection({
                    accountName: criteria.accountName,
                    accountNumber: criteria.accountNumber,
                    ifsc: criteria.ifsc,
                    mode: criteria.mode,
                    upiId: criteria.upiId,
                    userId: criteria.userId,
                    accountId: accountId,
                    qrcode: criteria.qrcode,
                });

                await accountData.save();

                resolve({ success: true, message: 'Account Details Saved Succesfully!' })
            } else {
                reject({ success: false, message: 'Some unhandled server error has occurred' });
                return;
            }


        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction)
}

function update(criteria) {
    let promiseFunction = async (resolve, reject) => {
        if (criteria && criteria.accountId) {
            delete criteria.__v;
            let q = { accountId: criteria.accountId };
            try {
                let existingAccount = await AccountDetailsCollection.findOneAndUpdate(q, criteria, { upsert: true }).exec();
                existingAccount = existingAccount.toJSON();
                resolve({ success: true, message: 'Account updated successfully!', data: existingAccount });
            } catch (err) {
                reject({ success: false, message: err && err.message ? err.message : helper.error.message.InternalServerError, error: err });
            }
        } else {
            reject({ success: false, message: helper.error.message.insufficientData, error: '' });
        }
    }
    return new Promise(promiseFunction);
}

function deleteById(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            let accountData = await AccountDetailsCollection.findOne({ accountId: criteria.accountId }).exec();
            if (!accountData) {
                return reject({ success: false, status: helpers.error.status.NotFound, message: helpers.error.message.NotFound });
            }
            try {
                await accountData.deleteOne();
            } catch (e) {
                return reject({ success: false, status: helpers.error.status.InternalServerError, message: helpers.error.message.InternalServerError, error: e });
            }
            resolve({ success: true, status: helpers.success.status.OK, message: 'Account Details deleted successfully!' });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction)

}

function getAccountDetails(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            if (criteria && criteria.accountId) {
                let condition = [];
                condition.push({ $match: { accountId: atob(criteria.accountId) } })

                let accountData = await AccountDetailsCollection.aggregate(condition).exec();

                if (criteria && ((criteria.mode && typeof criteria.mode !== 'object') || criteria.accountId)) {
                    accountData = (accountData && accountData.length) ? accountData[0] : accountData;
                }
                resolve({ success: true, message: 'success!', data: accountData });
            } else {
                reject({ success: false, message: 'Account Id is not provided' });
                return;
            }
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);
}