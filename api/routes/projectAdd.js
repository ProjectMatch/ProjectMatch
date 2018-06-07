const express = require('express');
const router = express.Router();
const isAuthenticated = require('../utils/authentication');
const Project = require('../models/Projects');
const Tags = require('../models/Tags');
const User = require('../models/Users');

module.exports = function(passport) {
  // add projects
  router.post('/', isAuthenticated, function(req, res) {
    // create new project
    const newProject = new Project();

    newProject.name = req.body.name;
    newProject.description = req.body.description;
    newProject.dueDate = req.body.dueDate;
    newProject.team = req.body.team;
    newProject.githubLink = req.body.githubLink;
    newProject.mockupLink = req.body.mockupLink;
    newProject.liveLink = req.body.liveLink;
    newProject.lookingFor = req.body.lookingFor;
    newProject.status = req.body.status;
    newProject.category = req.body.category;
    newProject.tags = req.body.tags;
    newProject.contact = req.body.contact;
    newProject.creator = req.body.creator;

    newProject.save(function(err, project) {
      if (err) {
        res.json({ error: 'Error in saving project: ' + err });
      } else {
        // check through array of tags and save new ones in collection
        if (project.tags) {
          project.tags.forEach(tag => {
            saveTag(tag);
          });
        }
        res.json({
          message: 'New project saved successfully',
          newProject: project
        });
      }
    });
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
