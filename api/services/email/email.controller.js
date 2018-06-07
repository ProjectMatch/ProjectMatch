const nodemailer = require('nodemailer');
const Project = require('../models/Projects');
const User = require('../models/Users');
const config = require('../utils/config');

function sendRequestToJoinTeam(req, res) {
  const link = req.body.link;
  const sender = req.body.username;
  const projectName = req.body.projectName;
  const projectId = req.body.projectId;
  const interestedParty = req.body.username;

  Project.findById(projectId, function(err, project) {
    if (err) {
      res.send(409);
    } else {
      User.findOne(
        {
          username: project.creator
        },
        function(err, user) {
          if (err) {
            res.send(409);
          } else {
            const to = user.email;

            const smtpTransport = nodemailer.createTransport({
              host: 'smtp.sendgrid.net',
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: 'apikey', // generated ethereal user
                pass:
                  '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' // generated ethereal password
              }
            });

            const mailOptions = {
              to: to,
              from: 'join_request@projectmatch.me',
              subject: 'Project Match - Join Request',
              text: `Hello,\n\nYou've got a request from ${sender} to join ${projectName}.\n\nYou can see their profile here: ${link}.\n\nTo accept the request, click: ${
                config.server.name
              }/api/projects/${projectId}/accept/${interestedParty}`
            };

            smtpTransport.sendMail(mailOptions, function(err) {
              if (err) {
                res.json({
                  error: err.message
                });
              }
              res.json({
                success: 'Success!'
              });
            });
          }
        }
      );
    }
  });
}

module.exports = {
  sendRequestToJoinTeam
};
