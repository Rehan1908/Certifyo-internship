import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()
const JWT_SECRET = "secret"

router.post ("/register", async (req,res) => {
const {email, password} = req.body
try {
const user = new User ({
  email, password
})
await user.save()
const payload = {
  sub: user._id.toString(), email: user.email
}
const token = jwt.sign(payload, JWT_SECRET, {
  expiresIn: "1h"
})
return res.status(201).json({token})
} catch (error) {
  console.log ("Error creating User")
}
})
router.post("/login", async (req,res) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({email});
const payload = {
  sub: user._id.toString(), email: user.email
}
const token = jwt.sign(payload, JWT_SECRET, {
  expiresIn: "1h"
})

return res.json({token})
} catch (error) {
      console.log ("Error Logging User")

  }
})
export default router
