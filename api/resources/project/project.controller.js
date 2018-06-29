const Project = require('../../models/Projects');
const Comment = require('../../models/Comments');
const Revision = require('../../models/Revisions');
const Marker = require('../../models/Markers');
const User = require('../../models/Users');
const config = require('../../utils/config');
const Tags = require('../../models/Tags');

const {
  createResponder,
  createDocHandler,
  createDataHandler
} = require('../helpers/dataHandlers');

function saveTag(name) {
  Tags.findOne({ name }, function(err, tag) {
    if (err) {
      console.log(err);
    } else if (!tag) {
      const newTag = new Tags({ name });
      newTag.save(err => console.log(err));
    }
  });
}

module.exports.getProject = function(req, res) {
  const projectId = req.params.id;
  const dataHandler = createDataHandler(res, { fieldName: 'project' });
  Project.findById(projectId, dataHandler);
};

module.exports.getProjectTeamMembers = function(req, res) {
  const projectId = req.params.id;
  const transform = project => {
    return [project.creator, ...project.team];
  };
  const dataHandler = createDataHandler(res, { fieldName: 'team', transform });
  Project.findById(projectId, dataHandler);
};

module.exports.getTeamThumbnails = function(req, res) {
  const projectId = req.params.id;

  const findTeammembers = project => {
    const team = [project.creator, ...project.team];
    const conditions = {
      username: {
        $in: team
      }
    };
    const transform = user => {
      return user.map(data => {
        return data.profileImage;
      });
    };

    const dataHandler = createDataHandler(res, {
      fieldName: 'thumbnailURLs',
      transform
    });
    User.find(conditions, dataHandler);
  };

  const projectHandler = createDocHandler(null, findTeammembers, res);
  Project.findById(projectId, projectHandler);
};

// TODO: Check if user in project first
module.exports.addCommentToProject = function(req, res) {
  const comment = new Comment({
    ...req.body,
    creator: req.user.username,
    project: req.params.id
  });
  const dataHandler = createDataHandler(res, { fieldName: 'comment' });
  comment.save(dataHandler);
};

module.exports.getCommentsForProject = function(req, res) {
  const conditions = { project: req.params.id };
  const dataHandler = createDataHandler(res, { fieldName: 'comments' });
  Comment.find(conditions, dataHandler);
};

// TODO: Check if user is in project first
module.exports.addRevisionToProject = function(req, res) {
  const revision = new Revision({
    ...req.body,
    creator: req.user.username,
    project: req.params.id
  });

  const dataHandler = createDataHandler(res, { fieldName: 'revision' });
  revision.save(dataHandler);
};

module.exports.getRevisionsForProject = function(req, res) {
  const conditions = { project: req.params.id };
  const dataHandler = createDataHandler(res, { fieldName: 'revisions' });
  Revision.find(conditions, dataHandler);
};

module.exports.getRevisionForProject = function(req, res) {
  const revisionId = req.params.revisionId;
  const dataHandler = createDataHandler(res, { fieldName: 'revision' });
  Revision.findById(revisionId, dataHandler);
};

// TODO: Check if user is in project first
module.exports.addMarkerToRevision = function(req, res) {
  const doc = req.body;
  doc.revision = req.params.revisionId;
  const marker = new Marker(doc);
  const dataHandler = createDataHandler(res, { fieldName: 'marker' });
  marker.save(dataHandler);
};

// TODO: Check if user is in project first
module.exports.deleteMarker = function(req, res) {
  const markerId = req.params.markerId;
  const dataHandler = createDataHandler(res, { fieldName: 'marker' });

  Marker.findByIdAndRemove(markerId, dataHandler);
};

module.exports.getMarkerForRevision = function(req, res) {
  const conditions = { revision: req.params.revisionId };
  const dataHandler = createDataHandler(res, { fieldName: 'markers' });
  Marker.find(conditions, dataHandler);
};

// TODO: Check if user created the marker
module.exports.updateMarker = function(req, res) {
  const markerId = req.params.markerId;
  const update = req.body;
  const options = { new: true };
  const dataHandler = createDataHandler(res, { fieldName: 'marker' });
  Marker.findByIdAndUpdate(markerId, update, options, dataHandler);
};

// TODO: Check if user is on team
module.exports.addCommentToMarker = function(req, res) {
  const doc = {
    ...req.body,
    creator: req.user.username,
    marker: req.params.markerId
  };
  const comment = new Comment(doc);
  const dataHandler = createDataHandler(res, { fieldName: 'comment' });
  comment.save(dataHandler);
};

module.exports.getCommentsForMarker = function(req, res) {
  const conditions = { marker: req.params.markerId };
  const dataHandler = createDataHandler(res, { fieldName: 'comments' });
  Comment.find(conditions, dataHandler);
};

// TODO: Check if user is the project creator
module.exports.addUserToTeam = function(req, req) {
  const projectId = req.params.projectId;
  const update = { $addToSet: { team: req.params.username } };
  const findTeammembers = project => {
    const conditions = { username: req.params.username };
    const update = {
      $push: {
        projects: mongoose.Types.ObjectId(req.params.prpojectId)
      }
    };
    const transform = user => {
      res.redirect(`${config.host.name}/projects/${project._id}`);
    };

    const dataHandler = createDataHandler(res, {
      fieldName: 'team',
      transform
    });
    User.findOneAndUpdate(conditions, update, userHandler);
  };

  const projectHandler = createDocHandler(null, findTeammembers, res);
  Project.findByIdAndUpdate(projectId, update, projectHandler);
};

module.exports.addProject = function(req, res) {
  const doc = req.body;
  const newProject = new Project(doc);
  const transform = project => {
    if (project.tags) {
      project.tags.forEach(tag => {
        saveTag(tag);
      });
    }
    return project;
  };

  const dataHandler = createDataHandler(res, {
    fieldName: 'newProject',
    transform
  });

  newProject.save(dataHandler);
};

// TODO: Check if user is project creator
module.exports.updateProject = function(req, res) {
  const projectId = req.params.id;
  const update = { ...req.body, modifiedAt: Date.now() };
  const options = { new: true };
  const transform = project => {
    if (project.tags) {
      project.tags.forEach(tag => {
        saveTag(tag);
      });
    }
    return project;
  };
  const dataHandler = createDataHandler(res, {
    fieldName: 'project',
    transform
  });
  Project.findByIdAndUpdate(projectId, update, options, dataHandler);
};

// TODO: Check if user is project creator
module.exports.deleteProject = function(req, res) {
  const projectId = req.body.id;
  const dataHandler = createDataHandler(res, { fieldName: 'project' });
  Project.findByIdAndRemove(projectId, dataHandler);
};

module.exports.getProjects = function(req, res) {
  const rawQuery = req.body.query;
  const options = req.body.options;
  const searchTerm = req.body.searchTerm;
  const $regex = new RegExp(searchTerm, 'i');
  const query = {
    ...rawQuery,
    $or: [
      { name: { $regex } },
      { description: { $regex } },
      { category: { $regex } },
      { tags: { $regex } }
    ]
  };

  const dataHandler = createDataHandler(res, { fieldName: 'projects' });
  Project.paginate(query, options, dataHandler);
};
