const { validationResult } = require("express-validator");

// Memeriksa hasil validasi dari setiap request
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path || error.param,
        message: error.msg
      }))
    });
  }

  next();
};

module.exports = validate;