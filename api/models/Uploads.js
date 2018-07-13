const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
const UploadsSchema = new Schema({
  user: { type: String },
  fileName: { type: String },
  fileLocation: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const Uploads = Mongoose.model('Uploads', UploadsSchema);

module.exports = Uploads;
