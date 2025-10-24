// src/middlewares/errorHandler.js

// Simple Express error-handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message); // Log error to console

  // Send a generic JSON error response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

export default errorHandler;
