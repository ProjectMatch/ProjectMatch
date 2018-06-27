const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
const UserDetailsSchema = new Schema({
  username: { type: String, default: '' },
  googleId: { type: String },
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
const UserDetails = Mongoose.model('UserDetails', UserDetailsSchema);

module.exports = UserDetails;
