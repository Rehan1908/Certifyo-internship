import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import  authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.post("/register", async (req,res)=> {
try {
  const {name , email, password} = req.body
  const existingUser = await User.findOne({email})
  if(existingUser) {
    return res.status(400).json({message: "Email Already in use"})
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

const newUser = new User({
  name,
  email,
  password: hashedPassword
});
await newUser.save();

const token = jwt.sign({
  userId: newUser._id
},
process.env.JWT_SECRET,
{expiresIn: "1h"}
);
return res.status(201).json({token, user: {
  id: newUser._id,
  name: newUser.name,
  email: newUser.email,
}})
} catch (error) {
  console.log("Registration Error")
  // No response is sent back to client
}
})


router.post("/login", async (req,res)=> {
try {
  const { email, password} = req.body
  const user = await User.findOne({email})
  if(!user) {
    return res.status(400).json({message: "Inalid Credentials"})
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
        return res.status(400).json({message: "Invalid Credentials"})
  }
const token = jwt.sign({
  userId: user._id
},
process.env.JWT_SECRET,
{expiresIn: "1h"}
);
return res.status(200).json({token, user: {
  id: user._id,
  name: user.name,
  email: user.email,
}})
} catch (error) {
  console.log("Login Error")
}
})



router.get("/me", authMiddleware, async (req,res)=> {
  try {
    const user = await User.findById(req.user.userId).select("-password")
    if (!user) {
      return res.status(404).json({message: "user not found"})
    }
    return res.status(200).json({user})

  } catch (error) {
          return res.status(500).json({message: "Error in finding"})

  }
})
export default router