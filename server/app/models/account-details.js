const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AccountDetailsSchema = new Schema({
    accountId: { type: String, required: true, unique: true },
    mode: { type: String, required: true },
    upiId: { type: String },
    accountName: { type: String },
    accountNumber: { type: String },
    ifsc: { type: String },
    userId: { type: String, required: true }

}, { collection: 'accountDetails', timestamps: true });

module.exports = mongoose.model('accountDetails', AccountDetailsSchema);