const express = require('express');
const router = express.Router();
const controller = require('./project.controller');
const isAuthenticated = require('../../utils/auth');

router.get('/', controller.getProjects);
router.get('/:id', controller.getProject);
router.post('/', isAuthenticated, controller.addProject);
router.put('/:id', isAuthenticated, controller.updateProject);
router.delete('/', isAuthenticated, controller.deleteProject);

router.post('/:id/comment', controller.addCommentToProject);
router.get('/:id/comments', controller.getCommentsForProject);

router.post('/:id/revision', controller.addRevisionToProject);
router.get('/:id/revisions', controller.getRevisionsForProject);
router.get('/revision/:revisionId', controller.getRevisionForProject);

router.post('/revision/:revisionId/marker', controller.addMarkerToRevision);
router.get('/revision/:revisionId/markers', controller.getMarkerForRevision);

router.put('/revision/marker/:markerId', controller.updateMarker);
router.delete('/revision/marker/:markerId', controller.deleteMarker);
router.post(
  '/revision/marker/:markerId/comment',
  controller.addCommentToMarker
);
router.get(
  '/revision/marker/:markerId/comments',
  controller.getCommentsForMarker
);

router.get('/:projectId/accept/:username', controller.addUserToTeam);
router.get('/:id/team', controller.getProjectTeamMembers);
router.get('/:id/team/thumbnails', controller.getTeamThumbnails);

module.exports = router;
