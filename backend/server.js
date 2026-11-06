require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

async function startServer() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Add it to your environment variables.");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing. Add it to your environment variables.");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Startup failed:", error.message);
    process.exit(1);
  });
}
