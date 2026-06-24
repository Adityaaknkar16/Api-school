module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isDev = process.env.NODE_ENV === 'development';

  const response = {
    status: 'error',
    message: isDev ? err.message : (err.message && statusCode < 500 ? err.message : 'Something went wrong on our server. Please try again later.')
  };

  if (isDev) {
    response.stack = err.stack;
    response.details = err;
  }

  // Always log the actual error stack for debugging
  console.error('[Error Handler Log]:', err);

  res.status(statusCode).json(response);
};
