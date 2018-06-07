const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CommentsSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: 'Projects' },
  marker: { type: Schema.Types.ObjectId, ref: 'Markers' },
  creator: { type: String },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;
