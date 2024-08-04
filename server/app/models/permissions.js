const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({ 
    type: { type: String },
    permissionAccess: { type: Schema.Types.Mixed }
}, { collection: 'permissions' })

module.exports = mongoose.model('permissions', PermissionSchema);