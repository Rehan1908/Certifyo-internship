import jwt from "jsonwebtoken"

const JWT_SECRET = "secret"

export function verifyToken (req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({
      message: "No Token Provided"
    })
  }
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Invalid Authorization Format"
    })

  }
  try {
    const decoded = jwt.verify(token,JWT_SECRET, {algorithms: ["HS256"]})
    req.user = decoded
    next();
  } catch (error) {
    return res.status(401).json({message: "Token Invalid or Expired"})
  }
}