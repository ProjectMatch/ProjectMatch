const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

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
  profileImage: { type: String, default: '' },
  location: { type: String, default: '' },
  roles: { type: Array },
  description: { type: String, default: '' },
  techstack: { type: Array },
  projects: { type: Array },
  bookmarked: { type: Array },
  linkedInLink: { type: String, default: '' },
  githubLink: { type: String, default: '' },
  portfolioLink: { type: String, default: '' },
  websiteLink: { type: String, default: '' },
  twitterLink: { type: String, default: '' },
  blogLink: { type: String, default: '' }
});

UserSchema.pre('save', function(next) {
  const hash = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  this.password = hash;
  next();
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
