const Tags = require('../../models/Tags');

function getTags(req, res) {
  return Tags.find({}, function(err, tags) {
    if (err) {
      return res.json({ error: 'Error getting tags: ' + err });
    } else {
      console.log(tags);
      return res.json({ tags: tags, message: 'Successfully retrieved tags' });
    }
  });
}

function addTag(req, res) {
  const name = req.body.name;
  const newTag = new Tags({ name });
  newTag.save(function(err) {
    if (err) {
      res.json({ error: 'Could not add tag' });
    } else {
      res.json({ message: 'Tag successfully added' });
    }
  });
}

module.exports = {
  getTags,
  addTag
};
