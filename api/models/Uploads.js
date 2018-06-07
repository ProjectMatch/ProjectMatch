const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UploadsSchema = new Schema({
  user: { type: String },
  fileName: { type: String },
  fileLocation: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const Uploads = mongoose.model('Uploads', UploadsSchema);

module.exports = Uploads;
