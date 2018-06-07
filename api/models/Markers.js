const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MarkerSchema = new Schema({
  type: { type: String }, // rectangle or circle
  creator: { type: String },
  createdAt: { type: Date, default: Date.now() },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  revision: { type: Schema.Types.ObjectId, ref: 'Revisions' },
  x: { type: Number },
  y: { type: Number },
  width: { type: Number },
  height: { type: Number },
  isResolved: { type: Boolean, default: false }
});
const Markers = mongoose.model('Markers', MarkerSchema);

module.exports = Markers;
