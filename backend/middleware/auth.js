const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers.authorization;
  const bearerToken = header && header.startsWith("Bearer ")
    ? header.slice(7)
    : null;
  const token = bearerToken || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Please login first" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
}

module.exports = { auth, adminOnly };
