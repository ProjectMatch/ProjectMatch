const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RevisionSchema = new Schema({
  revisionNumber: { type: String },
  finalVersion: { type: Boolean, default: false },
  imageURL: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now() },
  creator: { type: String },
  markers: [{ type: Schema.Types.ObjectId, ref: 'Markers' }],
  project: { type: Schema.Types.ObjectId, ref: 'Projects' },
  description: { type: String, default: '' }
});
const Revisions = mongoose.model('Revisions', RevisionSchema);

module.exports = Revisions;
