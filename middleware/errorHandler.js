const AppError = require("../utils/appError");
const log = require("../utils/logger");

const handleCastError = (err) =>
  new AppError(404, `Invalid ${err.path}: ${err.value}`);

const handleValidationError = (err) => {
  const message = Object.values(err.errors).map((el) => el.message);
  return new AppError(400, `${message.join(". ")}`);
};

const handleUnexpectedFileError = () =>
  new AppError(400, "Invalid file type or limit exceeded");

const handleFileCountError = () =>
  new AppError(400, "Image count limit exceeded");

const handleFileSizeError = () => new AppError(400, "File size is too large");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: "failed",
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({
      status: "failed",
      message: err.message,
    });
  } else {
    log.error(err);
    res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  console.error("error in error handler", err);

  if (process.env.NODE_ENV === "production") {
    // let error = { ...err };
    // if (err.name === "CastError") error = handleCastError(error);
    // if (err.name === "ValidationError") error = handleValidationError(error);
    // if (err.code === "LIMIT_UNEXPECTED_FILE")
    //   error = handleUnexpectedFileError();
    // if (err.code === "LIMIT_FILE_SIZE") error = handleFileSizeError();
    // if (err.code === "LIMIT_FILE_COUNT") error = handleFileCountError();

    sendErrorProd(err, res);
  } else {
    sendErrorDev(err, res);
  }
};

module.exports = errorHandler;
