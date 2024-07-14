const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const depositeSchema = new Schema({
    id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true },
    order_id: { type: String, required: true },
    transaction_id: { type: String, required: true },
    account: { type: String },
    amount: { type: Number, default: 0 },
    method: { type: String },
    status: { type: String },
    time_of_processing: { type: Date },
    comments: { type: String },
    isActive: { type: Boolean, default: false },
    isDeletable: { type: Boolean, default: false }
}, { collection: 'deposite' })

module.exports = mongoose.model('deposite', depositeSchema);