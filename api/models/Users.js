/* This is The User Schema For MongoDB and Mongoose
 * It contain fields for id, name,password,email.
 */
// Require Mongose ORM
var Mongoose = require('mongoose');
// Require Mongoose Schema to Make Mongoose Object
var Schema = Mongoose.Schema;

// Lets create Schema Object
// The formet will be x = { variables like type and conditionals...} fallowed by ','
var UserSchema = new Schema({
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

// This will creates database collection named "Users" in the Database
var Users = Mongoose.model('Users', UserSchema);

// We are making available it to other files
module.exports = Users;
