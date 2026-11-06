function notFound(req, res) {
  res.status(404).json({ message: "Route not found" });
}

function errorHandler(err, req, res, next) {
  console.error("ERROR:", err.message);

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({
      message: err.name === "CastError" ? "Invalid id" : err.message
    });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: "A record with this value already exists" });
  }

  res.status(500).json({ message: "Server error" });
}

module.exports = { notFound, errorHandler };
