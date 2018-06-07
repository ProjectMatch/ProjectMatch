const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  categoryName: { type: String }
});
const Categories = mongoose.model('Categories', CategorySchema);

module.exports = Categories;
