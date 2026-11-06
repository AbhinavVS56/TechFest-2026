const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const logger = require("./middleware/logger");
const errors = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Express 5 compatibility fix for express-mongo-sanitize
app.use((req, res, next) => {
  Object.defineProperty(req, "query", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: req.query
  });

  next();
});

app.use(mongoSanitize());
app.use(logger);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "TechFest API is running" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/registrations", require("./routes/registrations"));

app.use(errors.notFound);
app.use(errors.errorHandler);

module.exports = app;
