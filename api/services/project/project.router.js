const express = require('express');
const router = express.Router();
const controller = require('./project.controller');
const isAuthenticated = require('../utils/authentication');

router.post('/', controller.getProjects);
router.get('/:id', controller.getProject);
router.get('/:id/team', conroller.getProjectTeamMembers);
router.get('/:id/team/thumbnails', controller.getTeamThumbnails);
router.post('/:id/comment', controller.addCommentToProject);
router.get('/:id/comments', controller.getCommentsForProject);
router.post('/:id/revision', controller.addRevisionToProject);
router.get('/:id/revisions', controller.getRevisionsForProject);
router.get('/revision/:revisionId', controller.getRevisionForProject);
router.post('/revision/:revisionId/marker', controller.addMarkerToRevision);
router.delete('/revision/marker/:markerId', controller.deleteMarker);
router.get('/revision/:revisionId/markers', controller.getMarkerForRevision);
router.put('/revision/marker/:markerId', controller.updateMarker);
router.post(
  '/revision/marker/:markerId/comment',
  controller.addCommentToMarker
);
router.get(
  '/revision/markers/:markerId/comments',
  controller.getCommentsForMarker
);
router.get('/:projectId/accept/:username', controller.addUserToTeam);
router.post('/add', isAuthenticated, controller.addProject);
router.post('/update/:id', isAuthenticated, controller.updateproject);
router.delete('/delete', isAuthenticated, controller.deleteProject);

return router;

module.exports = router;
