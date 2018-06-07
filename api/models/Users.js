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
const Users = Mongoose.model('Users', UserSchema);

module.exports = Users;
