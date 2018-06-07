const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
const CategorySchema = new Schema({
  categoryName: { type: String }
});
const Categories = Mongoose.model('Categories', CategorySchema);

module.exports = Categories;
