const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error("ERROR:", err.message);

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
};

module.exports = { errorHandler };