const isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ error: 'unauthorized user', message: 'You are not authorized' });
};

module.exports = isAuthenticated;
