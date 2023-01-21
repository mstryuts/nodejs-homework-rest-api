const { HttpError } = require("../helpers/index");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }

    return next();
  };
}

const validationFavorite = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const error = new Error("missing field favorite");
      error.status = 400;

      next(error);
    }
    next();
  };
};

module.exports = {
  validateBody,
  validationFavorite,
};
