const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MerchantSchema = new Schema({
    merchantId: { type: String, required: true, unique: true },
    merchantname: { type: String, required: true },
    url: { type: String },
    userId: { type: String, required: true },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'banks'
    },

}, { collection: 'merchant', timestamps: true });

module.exports = mongoose.model('merchant', MerchantSchema);