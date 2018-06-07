const express = require('express');
const router = express.Router();
const isAuthenticated = require('../utils/authentication');
const Project = require('../models/Projects');
const Tags = require('../models/Tags');
const User = require('../models/Users');

module.exports = function(passport) {
  router.post('/:id', isAuthenticated, function(req, res) {
    const projectId = req.params.id;
    const updateBody = req.body;
    updateBody.modifiedAt = Date.now();
    delete updateBody._id;
    delete updateBody.images;

    Project.findOneAndUpdate(
      { _id: projectId },
      updateBody,
      { new: true },
      function(err, project) {
        if (err) {
          return res.json({ error: err });
        } else if (!project) {
          return res.json({ error: 'Project does not exist: ' + err });
        } else {
          if (project.tags) {
            project.tags.forEach(tag => {
              saveTag(tag);
            });
          }
          res.json({
            project: project,
            message: 'Project saved successfully'
          });
        }
      }
    );
  });

  return router;
};

saveTag = tagName => {
  Tags.findOne({ tagName: tagName }, function(err, tag) {
    if (err) {
      console.log('Error in retrieving tag: ' + err);
    } else if (!tag) {
      const newTag = new Tags({ tagName: tagName });
      newTag.save(function(err) {
        if (err) {
          console.log('Error in saving tag: ' + err);
        }
      });
    }
  });
};
