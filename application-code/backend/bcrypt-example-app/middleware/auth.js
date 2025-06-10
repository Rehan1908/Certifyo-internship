import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1) Check for token in Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3) Attach decoded payload to request
    req.user = decoded; // e.g. { userId: "..." }
  next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default authMiddleware;

