const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles',
    required: true
  },
  isPasswordChanged: { type: Boolean, default: false },
  invalidLoginAttempts: { type: Number, default: 0 },
  lastPasswordUpdatedAt: { type: Number },
  lastPasswords: [{ type: String }],
  temporarytoken: { type: String, required: false },
  resettoken: { type: String, required: false },
  accountCreated: { type: Date },
  loginAttempts: { type: Number, default: 0, select: false },
  blockExpires: { type: Date, default: Date.now, select: false }

}, { collection: 'users' });

UsersSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password); // Returns true if password matches, false if doesn't
}

module.exports = mongoose.model('users', UsersSchema);