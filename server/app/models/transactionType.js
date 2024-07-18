const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TransactionTypeSchema = new Schema({
    typeId: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    typeDetails: [{
        fieldName: { type: String },
        displayMode: { type: String },
        fieldType: { type: String },
        placeholder: { type: String },
        required: { type: Boolean, default: false },
    }],
    userId: { type: String, required: true }

}, { collection: 'transactionType', timestamps: true });

module.exports = mongoose.model('transactionType', TransactionTypeSchema);