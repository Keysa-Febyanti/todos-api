const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  let message = err.message || "Internal Server Error";

  // Menangani ID MongoDB yang tidak valid
  if (err.name === "CastError") {
    statusCode = 400;
    status = "fail";
    message = "Invalid ID format";
  }

  // Menangani kesalahan validasi Mongoose
  if (err.name === "ValidationError") {
    statusCode = 400;
    status = "fail";
    message = err.message;
  }

  // Menangani data duplikat
  if (err.code === 11000) {
    statusCode = 409;
    status = "fail";
    message = "Duplicate field value";
  }

  res.status(statusCode).json({
    status,
    message
  });
};

module.exports = errorHandler;