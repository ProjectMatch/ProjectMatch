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

function setupCategories(req, res) {
  const categoryArray = [
    'Educational',
    'Fun',
    'News & Weather',
    'Search Tools',
    'Shopping',
    'Social & Communication',
    'Sports',
    'Non-Profit',
    'Developer Tools',
    'Design Tools',
    'Productivity'
  ];

  saveNewCategories = categoryName => {
    const newCategory = new Categories({ categoryName: categoryName });
    newCategory.save(function(err) {
      if (err) {
        res.json({ error: 'Error in saving category: ' + category });
      }
    });
  };

  async function mapThenSaveCategories() {
    await categoryArray.map(category => {
      saveNewCategories(category);
    });

    Categories.find({}, function(err, categories) {
      if (err || !categories) {
        res.json({
          error: 'Error in saving and retrieving categories: ' + err
        });
      } else {
        res.json({
          categories: categories,
          message: 'Successfully saved batch categories'
        });
      }
    });
  }

  mapThenSaveCategories();
}

module.exports = {
  getCategories,
  setupCategories
};
