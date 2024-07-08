const UserCollection = require('../../models/user');
const RoleCollection = require('../../models/roles');
const ObjectId = require('mongoose').Types.ObjectId;
const helper = require('../../utility');

module.exports = {
    getUsers,
    getByUserId,
    update
}

function getUsers(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            let condition = [];
            if (criteria) {
                if (criteria._id) {
                    condition.push({ $match: { _id: new ObjectId(criteria._id) } });
                }
                if (criteria.userId) {
                    condition.push({ $match: { userId: criteria.userId } });
                }
                if (criteria.firstname) {
                    condition.push({ $match: { firstname: criteria.firstname } });
                }
                if (criteria.lastname) {
                    condition.push({ $match: { lastname: criteria.lastname } });
                }
                if (criteria.email) {
                    condition.push({ $match: { email: criteria.email } });
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
            let users = await UserCollection.aggregate(condition).exec();
            if (criteria && ((criteria.firstname && typeof criteria.firstname !== 'object') || criteria._id)) {
                users = (users && users.length) ? users[0] : {};
            }
            resolve({ success: true, message: 'success!', data: users });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);
}

function getByUserId(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            if (criteria && criteria.userId) {
                let user = await UserCollection.findOne({ userId: criteria.userId }).lean().exec();
                resolve({ success: true, message: 'success!', data: user });
            } else {
                reject({ success: false, message: 'UserId is not provided' });
                return;
            }
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);
}

function update(req) {
    let promiseFunction = async (resolve, reject) => {
        if (req.body && req.body.userId) {
            let user = req.body;
            delete user._id;
            delete user.__v;
            let q = { userId: user.userId };
            try {
                let result = await UserCollection.findOneAndUpdate(q, user, { upsert: false }).exec();
                result = result.toJSON();
                delete result.password;
                delete result.lastPasswords;
                resolve({ success: true, message: 'User updated successfully!', data: result });
            } catch (err) {
                reject({ success: false, message: err && err.message ? err.message : helper.error.message.InternalServerError, error: err });
            }
        } else {
            reject({ success: false, message: helper.error.message.insufficientData, error: '' });
        }
    }
    return new Promise(promiseFunction);
}