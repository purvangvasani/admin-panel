const RoleCollection = require('../../models/roles');
const UserCollection = require('../../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const helper = require('../../middleware/utils');
const helpers = require('../../utility');

module.exports = {
    getAll,
    getByRoleId,
    add,
    update,
    deleteById,
    runScript
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
                if (criteria.rolesId) {
                    condition.push({ $match: { rolesId: criteria.rolesId } });
                }
                if (criteria.roleName) {
                    condition.push({ $match: { roleName: criteria.roleName } });
                }
                if (criteria.displayName) {
                    condition.push({ $match: { displayName: criteria.displayName } });
                }
                if (criteria.roleLevel || criteria.roleLevel === 0) {
                    condition.push({ $match: { roleLevel: criteria.roleLevel } });
                }
                if (criteria.isActive || criteria.isActive === false) {
                    condition.push({ $match: { isActive: criteria.isActive } });
                }
                if (criteria.isDeleted || criteria.isDeleted === false) {
                    condition.push({ $match: { isDeleted: criteria.isDeleted } });
                }
                if (criteria.roleType === 'general') {
                    condition.push({ $match: { roleLevel: { $gt: 0 } } });
                }
            }
            if (criteria && criteria.sort) {
                condition.push({ $sort: criteria.sort });
            } else {
                condition.push({ $sort: { updatedAt: 1 } });
            }
            if (criteria.pageQuery) {

                totalCount = await RoleCollection.countDocuments({});
                totalPages = Math.ceil(totalCount / pageSize);

                const skip = (page - 1) * pageSize;
                condition.push({ $skip: skip }, { $limit: pageSize })
            }
            let roles = await RoleCollection.aggregate(condition).exec();
            if (criteria && ((criteria.rolename && typeof criteria.rolename !== 'object') || criteria._id)) {
                roles = (roles && roles.length) ? roles[0] : {};
            }
            resolve({ success: true, message: 'success!', data: roles, currentPage: page, totalPages, totalCount });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);

}

function runScript() {
    let promiseFunction = async (resolve, reject) => {
        let roles = await getAll({ roleType: 'general' });
        roles = roles.data;
        if (roles.length) {
            for (let i = 0; i < roles.length; i++) {
                roles[i]['isActive'] = false;
                await update(roles[i]);
            }
        }
        resolve({ success: true, message: 'success!' });
    }
    return new Promise(promiseFunction);
}

function getByRoleId(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            if (criteria && criteria.rolesId) {
                let role = await RoleCollection.findOne({ rolesId: criteria.rolesId }).lean().exec();
                resolve({ success: true, message: 'success!', data: role });
            } else {
                reject({ success: false, message: 'Role Id is not provided' });
                return;
            }
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);
}

function add(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {

            let isExists = await RoleCollection.findOne({
                $or: [
                    { roleName: criteria.roleName },
                    { roleLevel: criteria.roleLevel }
                ]
            }).lean().exec();
            if (isExists && isExists.rolesId) {
                reject({ success: false, message: 'Role already exists' });
                return;
            }

            if (criteria.roleLevel <= 0) {
                reject({ success: false, message: 'You cannot create a role with 0 rolelevel.' });
                return;
            }

            let rolesId = await helper.generateCounterId('roles', 'rolesId', 'QQR_');
            if (rolesId) {

                let roleData = await RoleCollection({
                    roleName: criteria.roleName,
                    displayName: criteria.displayName,
                    roleLevel: criteria.roleLevel,
                    isActive: criteria.isActive || false,
                    isDeletable: criteria.isDeletable || false
                });

                roleData['rolesId'] = rolesId;

                await roleData.save();

                resolve({ success: true, message: 'Role Saved Succesfully!' })
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
        if (criteria && criteria.rolesId) {
            delete criteria._id;
            delete criteria.__v;
            let q = { rolesId: criteria.rolesId };
            try {
                let result = await RoleCollection.findOneAndUpdate(q, criteria, { upsert: false }).exec();
                result = result.toJSON();
                resolve({ success: true, message: 'Role updated successfully!', data: result });
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
            let dbRole = await RoleCollection.findOne({ rolesId: criteria.rolesId }).exec();
            if (!dbRole) {
                return reject({ success: false, status: helpers.error.status.NotFound, message: helpers.error.message.NotFound });
            }
            if (!dbRole.isDeletable) {
                return reject({ success: false, status: helpers.error.status.Forbidden, message: 'Role is not deletable!' });
            }
            let users = await UserCollection.find({ role: dbRole._id }).exec();
            if (users && users.length) {
                return reject({ success: false, status: helpers.error.status.Forbidden, message: 'One or more users have been assessigned to this role! First Remove Users or change theire roles to delete the role!' });
            }
            try {
                await dbRole.deleteOne();
            } catch (e) {
                return reject({ success: false, status: helpers.error.status.InternalServerError, message: helpers.error.message.InternalServerError, error: e });
            }
            resolve({ success: true, status: helpers.success.status.OK, message: 'Role deleted successfully!', role: dbRole });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction)

}