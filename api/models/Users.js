var Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, default: '' },
  email: { type: String },
  password: { type: String },
  resetToken: { type: String },
  resetTokenExpires: { type: Date },
  status: { type: Boolean, default: true },
  googleId: { type: String },
  profileImage: { type: String, default: '' }
});
const Users = Mongoose.model('Users', UserSchema);

module.exports = Users;
