function sendError(res) {
  res.json({
    error: 'Something went wrong'
  });
}

function createResponder(successMessage, fieldName, transform) {
  successMessage = successMessage || 'Success!';
  return function(doc, res) {
    res.json({
      message: successMessage,
      [fieldName]: transform ? transform(doc) : doc
    });
  };
}

function createDocHandler(errorHandler, responder, res) {
  return function(err, doc) {
    if (err || !doc) {
      !errorHandler ? sendError(res) : errorHandler(err);
    } else {
      responder(doc, res);
    }
  };
}

function createDataHandler(res, options) {
  const {
    fieldName,
    transform,
    successMessage,
    errorHandler,
    errorMessage
  } = options;

  const responder = createResponder(successMessage, fieldName, transform);
  return createDocHandler(errorHandler, responder, res);
}

module.exports = {
  sendError,
  createResponder,
  createDocHandler,
  createDataHandler
};
