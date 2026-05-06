const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Lỗi server nội bộ.',
    error: err.message || 'Unknown error',
  });
};

module.exports = errorHandler;
