const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
const TagSchema = new Schema({
  tagName: { type: String }
});
const Tags = Mongoose.model('Tags', TagSchema);

module.exports = Tags;
