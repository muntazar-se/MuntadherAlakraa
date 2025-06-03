require("dotenv").config();
const express = require("express");
const connectDB = require("./server/config/db"); // ✅ this is your DB function
const profileRoutes = require("./server/routes/profileRoutes");
const projectRoutes = require("./server/routes/projectRoutes");
const cvUploadRoutes = require("./server/routes/cvUploadRoutes");
// const authMiddleware = require('./middleware/auth');
const authRoutes = require("./server/routes/auth");
const cors = require('cors');

const app = express();
app.use(express.json());

// ✅ Connect to MongoDB before starting the server
connectDB()
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.use(cors());
    // Register routes only after DB is connected
    app.use("/api/profile", profileRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api", cvUploadRoutes);
    app.use("/api/auth", authRoutes);

    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
