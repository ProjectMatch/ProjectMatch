const nodemailer = require('nodemailer');
const Project = require('../models/Projects');
const User = require('../models/Users');
const config = require('../utils/config');

const SMTP_HOST = 'smtp.sendgrid.net';
const PORT = 587;
const SECURE = false;
const USER = 'apikey';
const PASS =
  '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';

const FROM_EMAIL = 'join_request@projectmatch.me';
const EMAIL_SUBJECT = 'Project Match - Join Request';

function createSMTPTransport() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: PORT,
    secure: SECURE,
    auth: {
      user: USER,
      pass: PASS
    }
  });
}

function sendEmailRequest(err, res, user, info) {
  const sender = info.username;
  const projectName = info.projectName;
  const projectId = info.projectId;
  const interestedParty = info.username;

  if (err) {
    res.send(409);
  } else {
    const smtpTransport = createSMTPTransport();
    const mailerOptions = {
      to: user.email,
      from: FROM_EMAIL,
      subject: EMAIL_SUBJECT,
      text: `Hello,\n\nYou've got a request from ${sender} to join ${projectName}.\n\nYou can see their profile here: ${link}.\n\nTo accept the request, click: ${
        config.server.name
      }/api/projects/${projectId}/accept/${interestedParty}`
    };

    smtpTransport.sendMail(mailerOptions, function(err) {
      if (err) {
        res.json({
          error: err.message
        });
      }
      res.json({
        success: 'Email sent'
      });
    });
  }
}

function sendRequestToJoinTeam(req, res) {
  const id = req.params.projectId;

  Project.findById(id, function(err, project) {
    if (err) {
      res.send(409);
    } else {
      const conditions = {
        username: project.creator
      };

      User.findOne(conditions, sendEmailRequest(err, res, user, req.body));
    }
  });
}

module.exports = {
  sendRequestToJoinTeam
};
