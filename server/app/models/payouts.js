const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const payoutsSchema = new Schema({
    id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true },
    order_id: { type: String, required: true }, 
    account: { type: String },
    amount: { type: Number, default: 0 }, 
    status: { type: String },
    time_of_processing: { type: Date },
    comments: { type: String },
    accountNumber: { type: String },
    accountName: { type: String },
    isActive: { type: Boolean, default: false },
    isDeletable: { type: Boolean, default: false }
}, { collection: 'payouts' })

module.exports = mongoose.model('payouts', payoutsSchema);