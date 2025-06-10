import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protected.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware to parse JSON bodies
app.use(express.json());

// 2. Connect to MongoDB
//    Make sure MongoDB is running locally at the default port, or change the URI below.
mongoose
  .connect(, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// 3. Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

// 4. Basic public route
app.get("/", (req, res) => {
  res.send("Hello! This is a public endpoint.");
});

// 5. Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:3000`);
});

