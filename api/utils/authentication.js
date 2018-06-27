const isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('You are authorized');
    return next();
  }
  res.send({ message: 'You are not authorized' });
};

module.exports = isAuthenticated;
