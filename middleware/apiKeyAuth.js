const AppError = require("../utils/AppError");

// Memeriksa API Key untuk akses eksternal
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!process.env.API_KEY) {
    return next(new AppError("API Key is not configured", 500));
  }

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return next(new AppError("Invalid or missing API Key", 401));
  }

  next();
};

module.exports = apiKeyAuth;