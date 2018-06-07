const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TagSchema = new Schema({
  tagName: { type: String }
});
const Tags = mongoose.model('Tags', TagSchema);

module.exports = Tags;
