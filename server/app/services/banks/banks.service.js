const BankCollection = require('../../models/banks');
const ObjectId = require('mongoose').Types.ObjectId;
const helper = require('../../middleware/utils');
const helpers = require('../../utility');
const TransactionType = require('../../models/transactionType');

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
                if (criteria.bankId) {
                    condition.push({ $match: { bankId: criteria.bankId } });
                }
                if (criteria.bankName) {
                    condition.push({ $match: { bankName: criteria.bankName } });
                }
                if (criteria.active || criteria.active === false) {
                    condition.push({ $match: { active: criteria.active } });
                }
            }
            if (criteria && criteria.sort) {
                condition.push({ $sort: criteria.sort });
            } else {
                condition.push({ $sort: { updatedAt: 1 } });
            }
            if (criteria.pageQuery) {

                totalCount = await BankCollection.countDocuments({});
                totalPages = Math.ceil(totalCount / pageSize);

                const skip = (page - 1) * pageSize;
                condition.push({ $skip: skip }, { $limit: pageSize })
            }
            let banks = await BankCollection.aggregate(condition).exec();
            if (criteria && ((criteria.bankName && typeof criteria.bankName !== 'object') || criteria._id)) {
                banks = (banks && banks.length) ? banks[0] : {};
            }
            resolve({ success: true, message: 'success!', data: banks, currentPage: page, totalPages, totalCount });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);
}

function add(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {

            let isExists = await BankCollection.findOne({ bankName: criteria.bankName }).lean().exec();
            if (isExists && isExists.rolesId) {
                reject({ success: false, message: 'Bank already exists' });
                return;
            }

            let bankId = await helper.generateCounterId('banks', 'bankId', 'QQB_');
            if (bankId) {

                let bankData = await BankCollection({
                    bankName: criteria.bankName,
                    ref: criteria.ref,
                    userId: criteria.userId,
                    bankId: bankId,
                    active: criteria.active || false,
                });
                for (let i = 0; i < criteria.uploadDetails.length; i++) {
                    delete criteria.uploadDetails['_id'];
                }
                bankData['uploadDetails'] = criteria.uploadDetails;

                // Process deposits
                if (criteria.deposits) {
                    let depositTransactionType = new TransactionType({
                        typeId: await helper.generateCounterId('transactionType', 'typeId', 'TTY_'),
                        type: 'deposit',
                        typeDetails: criteria.deposits,
                        userId: criteria.userId
                    });
                    await depositTransactionType.save();
                    bankData.deposits = depositTransactionType._id;
                } else {
                    delete criteria.deposits;
                }

                // Process withdrawals
                if (criteria.withdrawals) {
                    let withdrawalTransactionType = new TransactionType({
                        typeId: await helper.generateCounterId('transactionType', 'typeId', 'TTY_'),
                        type: 'withdrawal',
                        typeDetails: criteria.withdrawals,
                        userId: criteria.userId
                    });
                    await withdrawalTransactionType.save();
                    bankData.withdrawals = withdrawalTransactionType._id;
                } else {
                    delete criteria.withdrawals;
                }
                await bankData.save();

                resolve({ success: true, message: 'Bank Saved Succesfully!' })
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
        if (criteria && criteria.bankId) {
            delete criteria.__v;
            let q = { bankId: criteria.bankId };
            try {
                let existingBank = await BankCollection.findOne(q).exec();
                if (!existingBank) {
                    reject({ success: false, message: 'Bank not found' });
                    return;
                }

                // Process deposits
                if (criteria.deposits) {
                    let depositTransactionType = await TransactionType.findOne({ _id: existingBank.deposits });
                    if (!depositTransactionType) {
                        depositTransactionType = new TransactionType({
                            typeId: await helper.generateCounterId('transactionType', 'typeId', 'TTY_'),
                            type: 'deposit',
                            typeDetails: criteria.deposits,
                            userId: criteria.userId
                        });
                        await depositTransactionType.save();
                        criteria.deposits = depositTransactionType._id;
                    } else {
                        depositTransactionType.typeDetails = criteria.deposits;
                        depositTransactionType.userId = criteria.userId;
                        await depositTransactionType.save();
                    }
                    criteria.deposits = depositTransactionType._id;
                } else {
                    delete criteria.deposits;
                }

                // Process withdrawals
                if (criteria.withdrawals) {
                    let withdrawalTransactionType = await TransactionType.findOne({ _id: existingBank.withdrawals });
                    if (!withdrawalTransactionType) {
                        withdrawalTransactionType = new TransactionType({
                            typeId: await helper.generateCounterId('transactionType', 'typeId', 'TTY_'),
                            type: 'withdrawal',
                            typeDetails: criteria.withdrawals,
                            userId: criteria.userId
                        });
                        await withdrawalTransactionType.save();
                    } else {
                        withdrawalTransactionType.typeDetails = criteria.withdrawals;
                        withdrawalTransactionType.userId = criteria.userId;
                        await withdrawalTransactionType.save();
                    }
                    criteria.withdrawals = withdrawalTransactionType._id;
                } else {
                    delete criteria.withdrawals;
                }
                let result = await BankCollection.findOneAndUpdate(q, criteria, { upsert: false }).exec();
                result = result.toJSON();
                resolve({ success: true, message: 'Bank updated successfully!', data: result });
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
            let bankData = await BankCollection.findOne({ bankId: criteria.bankId }).exec();
            if (!bankData) {
                return reject({ success: false, status: helpers.error.status.NotFound, message: helpers.error.message.NotFound });
            }
            try {
                await bankData.deleteOne();
            } catch (e) {
                return reject({ success: false, status: helpers.error.status.InternalServerError, message: helpers.error.message.InternalServerError, error: e });
            }
            resolve({ success: true, status: helpers.success.status.OK, message: 'Bank deleted successfully!' });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction)

}

function getById(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            if (criteria && criteria.bankId) {
                let condition = [];
                condition.push({ $match: { bankId: criteria.bankId } })
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
                condition.push(depositLookup)
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
                condition.push(withdrawalLookup)
                // let item = await BankCollection.findOne({ bankId: criteria.bankId })
                //     .populate('deposits', 'withdrawals')
                //     .lean().exec();
                // console.log(item)
                let bank = await BankCollection.aggregate(condition).exec();
                if (criteria && ((criteria.bankName && typeof criteria.bankName !== 'object') || criteria.bankId)) {
                    bank = (bank && bank.length) ? bank[0] : {};
                }
                resolve({ success: true, message: 'success!', data: bank });
            } else {
                reject({ success: false, message: 'Bank Id is not provided' });
                return;
            }
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);
}