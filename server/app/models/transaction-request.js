const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const depositeSchema = new Schema({
    id: { type: String, required: true, unique: true },
    user_id: { type: String },
    merchant_id: { type: String, required: true },
    transaction_id: { type: String, required: true },
    accountName: { type: String },
    accountNumber: { type: String, default: 0 }, 
    amount: { type: Number, default: 0 },
    operationType: { type: String },
    status: { type: String },
    type: { type: String, required: true },
    comments: { type: String },
}, { collection: 'transactionRequest', timestamps: true })

module.exports = mongoose.model('transactionRequest', depositeSchema);