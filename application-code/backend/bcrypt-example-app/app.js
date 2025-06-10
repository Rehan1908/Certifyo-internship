import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// ── MIDDLEWARE ──────────────────────────────────────────────────────────
app.use(express.json()); // for parsing application/json

// ── ROUTES ──────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Simple Auth Demo ");
});

// ── ERROR HANDLING (simple) ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Server error." });
});

// ── DATABASE CONNECTION & SERVER START ──────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

