const notFound = (req, res, next) => {
  const error = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = async (err, req, res, next) => {
  let statusCode = req.statusCode === 200 ? 500 : req.statusCode;
  let message = err.message;

  // Handle Mongoose bad ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }

  // Handle Mongoose validation error
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    statusCode = 400;
  }

  // Handle duplicate key error (e.g, MongoDB unique constraint)
  if (err.code && err.code === 11000) {
    message = "Duplicate field value entered";
    statusCode = 400;
  }

  // Handle Token expired errors
  if (err.name === "TokenExpiredError") {
    message = "Token expired";
    statusCode = 401;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token";
    statusCode = 401;
  }

  // Handle generic TypeError (e.g., Cannot read properties of undefined)
  if (err instanceof TypeError) {
    message = "An unexpected error occurred";
    statusCode = 500;
  }

  // Set default status code for other unhandled errors
  statusCode = statusCode || 500;
  message = message || "Internal Server Error";

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
};

export { notFound, errorHandler };
