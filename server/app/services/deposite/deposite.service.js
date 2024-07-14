const DepositeCollection = require('../../models/deposite');
const ObjectId = require('mongoose').Types.ObjectId;
const PREDEFINEDDATA = require('./predefined-data.json')
module.exports = {
    getAll
}

function getAll() {
    let promiseFunction = async (resolve, reject) => {
        try {
            // let deposites = await DepositeCollection.find({}).exec();
            let deposites = PREDEFINEDDATA.data;
            if (deposites && !deposites.length) {
                return reject({ success: false, status: helpers.error.status.Forbidden, message: 'No Data found' });
            }
            resolve({ success: true, message: 'Deposit Requests fetch successfully.', data: deposites });
        } catch (err) {
            reject({ success: false, message: 'Some unhandled server error has occurred', error: err });
        }
    }
    return new Promise(promiseFunction);

} 