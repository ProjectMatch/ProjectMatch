const Project = require('../models/Projects');
const UserDetails = require('../models/UserDetails');
const Comment = require('../models/Comments');
const Revision = require('../models/Revisions');
const Marker = require('../models/Markers');
const User = require('../models/Users');
const config = require('../utils/config');

function getProjects(req, res) {
  const query = req.body.query;
  const options = req.body.options;

  if (query && query.searchTerm) {
    const queryToRegex = new RegExp(query.searchTerm, 'i');
    query = delete query.searchTerm;
    query = Object.assign({}, query, {
      $or: [
        {
          name: {
            $regex: queryToRegex
          }
        },
        {
          description: {
            $regex: queryToRegex
          }
        },
        {
          category: {
            $regex: queryToRegex
          }
        },
        {
          tags: {
            $regex: queryToRegex
          }
        }
      ]
    });
  }

  Project.paginate(
    query === undefined || query === {} ? {} : query,
    options,
    function(err, result) {
      if (err) {
        return res.json({
          error: 'Error retrieving project: ' + err
        });
      } else {
        res.json({
          projects: result,
          message: 'Succesfully retrieved projects'
        });
      }
    }
  );
}

function getProject(req, res) {
  Project.findOne(
    {
      _id: req.params.id
    },
    function(err, project) {
      if (err || !project) {
        res.json({
          error: 'Error in retrieving project: ' + err
        });
      } else {
        res.json({
          message: 'Successfully retrieved project',
          project: project
        });
      }
    }
  );
}

function getProjectTeamMembers(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if (err) {
      res.send(err);
    } else {
      const team = project.team;
      team.push(project.creator);
      res.json({
        message: `Successfully retrieved team for ${project._id}`,
        team
      });
    }
  });
}

function getTeamThumbnails(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if (err) {
      res.send(err);
    } else {
      const team = project.team;
      team.push(project.creator);
      User.find(
        {
          username: {
            $in: team
          }
        },
        function(err, user) {
          if (err) {
            res.send(err);
          } else {
            const thumbnailsURLs = user.map(data => {
              return data.profileImage;
            });
            res.json({
              message: 'Team successfully found for project ' + req.params.id,
              thumbnailsURLs
            });
          }
        }
      );
    }
  });
}

function addCommentToProject(req, res) {
  const comment = new Comment({
    creator: req.body.username,
    comment: req.body.comment,
    project: req.params.id
  });

  comment.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        message: 'Comment successfully added to project ' + req.params.id,
        comment
      });
    }
  });
}

function getCommentsForProject(req, res) {
  Comment.find(
    {
      project: req.params.id
    },
    function(err, comments) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: 'Comment successfully retreived for poject ' + req.params.id,
          comments
        });
      }
    }
  );
}

function addRevisionToProject(req, res) {
  const revision = new Revision({
    revisionNumber: req.body.revisionNumber,
    finalVersion: req.body.finalVersion,
    imageURL: req.body.imageURL,
    creator: req.body.creator,
    description: req.body.description,
    project: req.params.id
  });

  revision.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        message: 'Revision successfully added to project ' + req.params.id
      });
    }
  });
}

function getRevisionsForProject(req, res) {
  Revision.find(
    {
      project: req.params.id
    },
    function(err, revisions) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message:
            'Revisions successfully retrieved for project ' + req.params.id,
          revisions
        });
      }
    }
  );
}

function getRevisionForProject(req, res) {
  Revision.findOne(
    {
      _id: req.params.revisionId
    },
    function(err, revision) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message:
            'Revision successfully retrieved for project ' + req.params.id,
          revision
        });
      }
    }
  );
}

function addMarkerToRevision(req, res) {
  const marker = new Marker({
    type: req.body.type,
    creator: req.body.creator,
    revision: req.params.revisionId,
    x: req.body.x,
    y: req.body.y,
    width: req.body.width,
    height: req.body.height
  });

  marker.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        message:
          'Marker successfully added to revision ' + req.params.revisionId,
        marker
      });
    }
  });
}

function deleteMarker(req, res) {
  Marker.findOneAndRemove(
    {
      _id: req.params.markerId
    },
    function(err, marker) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: `Marker ${req.params.markerId} successfully deleted`,
          marker
        });
      }
    }
  );
}

function getMarkerForRevision(req, res) {
  Marker.find(
    {
      revision: req.params.revisionId
    },
    function(err, markers) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message:
            'Markers successfully retrieved for revision ' +
            req.params.revisionId,
          markers
        });
      }
    }
  );
}

function updateMarker(req, res) {
  Marker.findOneAndUpdate(
    {
      _id: req.params.markerId
    },
    req.body,
    { new: true },
    function(err, marker) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: `Marker ${req.params.markerId} successfully updated`,
          marker
        });
      }
    }
  );
}

function addCommentToMarker(req, res) {
  const comment = new Comment({
    creator: req.body.creator,
    comment: req.body.comment,
    marker: req.params.markerId
  });

  comment.save(function(err) {
    console.log(req.body);
    console.log(comment);
    if (err) {
      console.log(err);
    } else {
      res.json({
        message: 'Comment successfully added to marker ' + req.params.markerId,
        comment
      });
    }
  });
}

function getCommentsForMarker(req, res) {
  Comment.find(
    {
      marker: req.params.markerId
    },
    function(err, comments) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: 'Comment successfully retreived for marker ' + req.params.id,
          comments
        });
      }
    }
  );
}

function addUserToTeam(req, req) {
  Project.findByIdAndUpdate(
    req.params.projectId,
    {
      $addToSet: {
        team: req.params.username
      }
    },
    function(err, project) {
      if (err) {
        console.log(err);
        res.status(409);
      } else {
        UserDetails.findOneAndUpdate(
          { username: req.params.username },
          {
            $push: {
              projects: mongoose.Types.ObjectId(req.params.prpojectId)
            }
          },
          function(err, user) {
            if (err) {
              console.log(err);
              res.status(409);
            } else {
              res.redirect(`${config.host.name}/projects/${project._id}`);
            }
          }
        );
      }
    }
  );
}

module.exports = {
  getProjects,
  getProject,
  getProjectTeamMembers,
  getTeamThumbnails,
  addCommentToProject,
  getCommentsForProject,
  addRevisionToProject,
  getRevisionsForProject,
  getRevisionForProject,
  addMarkerToRevision,
  deleteMarker,
  getMarkerForRevision,
  updateMarker,
  addCommentToMarker,
  getCommentsForMarker,
  addUserToTeam
};
