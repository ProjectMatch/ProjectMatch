const Categories = require('../models/Categories');

function getCategories(req, res) {
  return Categories.find({}, function(err, categories) {
    if (err) {
      return res.json({ error: 'Error getting categories: ' + err });
    } else {
      return res.json({
        categories: categories,
        message: 'Successfully retrieved categories'
      });
    }
  });
}

function addCategory(name) {
  const newCategory = new Categories({ categoryName: name });
  newCategory.save(function(err) {
    if (err) {
      res.json({ error: 'Error in saving category: ' + category });
    }
  });
}

module.exports = {
  getCategories,
  addCategory
};
