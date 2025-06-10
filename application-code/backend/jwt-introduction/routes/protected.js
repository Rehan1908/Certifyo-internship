import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/protected/data
router.get("/data", verifyToken, (req, res) => {
  // If we reach this handler, req.user is set by verifyToken()
  // req.user === { sub: "<userId>", email: "<userEmail>", iat: <timestamp>, exp: <timestamp>, iss: "simple-app" }
  return res.json({
    message: "You have access to protected data!",
    yourUserId: req.user.sub,
    yourEmail: req.user.email
  });
});

export default router;

