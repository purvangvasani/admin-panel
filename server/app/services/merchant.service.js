const ObjectId = require('mongoose').Types.ObjectId;
const helper = require('../middleware/utils');
const helpers = require('../utility');
const MerchantCollection = require('../models/merchant');
const BankCollection = require('../models/banks');
const bcrypt = require('bcrypt');

module.exports = {
    getAll,
    add,
    update,
    deleteById,
    getById
}

function getAll(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            let totalPages = 0;
            const page = parseInt(criteria.pageQuery) || 1; // Page number from the request query, default is 1
            const pageSize = 2; // Number of records per page
            let totalCount = 0;

            let condition = [];
            if (criteria) {
                if (criteria._id) {
                    condition.push({ $match: { _id: new ObjectId(criteria._id) } });
                }
                if (criteria.merchantId) {
                    condition.push({ $match: { merchantId: criteria.merchantId } });
                }
                if (criteria.merchantname) {
                    condition.push({ $match: { merchantname: criteria.merchantname } });
                }
            }
            if (criteria && criteria.sort) {
                condition.push({ $sort: criteria.sort });
            } else {
                condition.push({ $sort: { updatedAt: 1 } });
            }
            if (criteria.pageQuery) {

                totalCount = await MerchantCollection.countDocuments({});
                totalPages = Math.ceil(totalCount / pageSize);

                const skip = (page - 1) * pageSize;
                condition.push({ $skip: skip }, { $limit: pageSize })
            }
            let merchantData = await MerchantCollection.aggregate(condition).exec();
            for (let i = 0; i < merchantData.length; i++) {
                merchantData[i]['depositURL'] = '/deposit-add;id=' + merchantData[i]['url']; 
                merchantData[i]['withdrawalURL'] = '/withdrawal-add;id=' + merchantData[i]['url']; 
            }
            if (criteria && ((criteria.merchantname && typeof criteria.merchantname !== 'object') || criteria._id)) {
                merchantData = (merchantData && merchantData.length) ? merchantData[0] : {};
            }
            resolve({ success: true, message: 'success!', data: merchantData, currentPage: page, totalPages, totalCount });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);
}

function add(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {

            let isExists = await MerchantCollection.findOne({ merchantname: criteria.merchantname }).lean().exec();
            if (isExists && isExists.merchantId) {
                reject({ success: false, message: 'Merchant already exists' });
                return;
            }

            let merchantId = await helper.generateCounterId('merchant', 'merchantId', 'QQM_');
            if (merchantId) {

                let merchantData = await MerchantCollection({
                    merchantname: criteria.merchantname,
                    userId: criteria.userId,
                    merchantId: merchantId,
                });

                const hashURL = await bcrypt.hash(
                    merchantId,
                    2,
                );

                merchantData['url'] = hashURL;

                await merchantData.save();

                resolve({ success: true, message: 'Merchant Saved Succesfully!' })
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
        if (criteria && criteria.merchantId) {
            delete criteria.__v;
            let q = { merchantId: criteria.merchantId };
            try {
                let existingMerchant = await MerchantCollection.findOne(q).exec();
                if (!existingMerchant) {
                    reject({ success: false, message: 'Merchant not found' });
                    return;
                }

                let result = await MerchantCollection.findOneAndUpdate(q, criteria, { upsert: false }).exec();
                result = result.toJSON();
                resolve({ success: true, message: 'Merchant updated successfully!', data: result });
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
            let merchantData = await MerchantCollection.findOne({ merchantId: criteria.merchantId }).exec();
            if (!merchantData) {
                return reject({ success: false, status: helpers.error.status.NotFound, message: helpers.error.message.NotFound });
            }
            try {
                await merchantData.deleteOne();
            } catch (e) {
                return reject({ success: false, status: helpers.error.status.InternalServerError, message: helpers.error.message.InternalServerError, error: e });
            }
            resolve({ success: true, status: helpers.success.status.OK, message: 'Merchant deleted successfully!' });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction)

}

function getById(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            if (criteria && criteria.merchantId) {
                let condition = [];
                condition.push({ $match: { merchantId: atob(criteria.merchantId) } })

                let merchant = null;
                if (criteria?.for === 'public') {
                    merchant = await MerchantCollection.findOne({ merchantId: atob(criteria.merchantId)}, {merchantname: 1}).exec();
                    if (criteria?.get === 'bankDeposits') {
                        let newCondition = [];
                        newCondition.push({ $match: { ref: atob(criteria.merchantId) } })
                        let depositLookup = {
                            $lookup:
                            {
                                from: 'transactionType',
                                // let: {type: 'deposit' },
                                localField: 'deposits',
                                foreignField: '_id',
                                as: 'deposits'
                            }
                        }
                        newCondition.push(depositLookup)
                        let withdrawalLookup = {
                            $lookup:
                            {
                                from: 'transactionType',
                                // let: {type: 'withdrawal' },
                                localField: 'withdrawals',
                                foreignField: '_id',
                                as: 'withdrawals'
                            }
                        }
                        newCondition.push(withdrawalLookup)
                        let bank = await BankCollection.aggregate(newCondition).exec();
                        if (bank.length) {
                            bank = (bank && bank.length) ? bank[0] : {};
                            merchant._doc['depositFields'] = bank;
                        }
                    }
                } else {
                    merchant = await MerchantCollection.aggregate(condition).exec();
                }
                if (criteria && ((criteria.merchantname && typeof criteria.merchantname !== 'object') || criteria.merchantId)) {
                    merchant = (merchant && merchant.length) ? merchant[0] : merchant;
                }
                resolve({ success: true, message: 'success!', data: merchant });
            } else {
                reject({ success: false, message: 'Merchant Id is not provided' });
                return;
            }
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);
}