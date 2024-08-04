const PermissionCollection = require('../../models/permissions');

module.exports = {
    getBy,
    update
}

function getBy() {
    let promiseFunction = async (resolve, reject) => {
        try {
            let permission = await PermissionCollection.findOne({type: 'transactionPayments'}).lean().exec();
            resolve({ success: true, message: 'success!', data: permission });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);
}

function update(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            let permission = await PermissionCollection.findOne({}).lean().exec();
            if (permission && permission.permissionAccess) {
                let q = { permissionAccess: criteria.permissions, type: criteria.type };
                await PermissionCollection.findByIdAndUpdate(permission._id, q, {upsert: false}).exec();
            } else {
                let data = await PermissionCollection({
                    type: criteria.type,
                    permissionAccess: criteria.permissions
                })
                await data.save();
            }
            resolve({ success: true, message: 'success!', });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);
}