const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BanksSchema = new Schema({
    bankId: { type: String, required: true, unique: true },
    bankName: { type: String, required: true },
    active: { type: Boolean, default: false },
    ref: { type: String, required: true },
    uploadDetails: [{
        uploadName: { type: String },
        uploadValue: { type: String },
    }],
    deposits: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transactionType'
    },
    withdrawals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transactionType'
    },
    userId: { type: String, required: true }

}, { collection: 'banks', timestamps: true });

module.exports = mongoose.model('banks', BanksSchema);