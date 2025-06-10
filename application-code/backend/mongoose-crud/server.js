import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(console.log("MongoDB is Connected"))


const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", userSchema);

app.post("/users", async (req, res) => {
  const user = new User (req.body);
  const saved = await user.save();
  res.status(201).json(saved);
})

app.get ("/users", async (req,res) => {
  const users = await User.find();
  res.json(users);
})

app.get ("/users/:id", async (req,res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)  return res.status(404).send("User Not Found");
    res.json (user);
  }
  catch{
    res.status(400).send("Invalid ID")
  }
  }
)

app.put ("/users/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {new : true});
  if (!updated) return res.status(404).send("User Not Found");
  res.json(updated);
  
});

app.delete("/users/:id", async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send("User not Found");
  res.sendStatus(204)
})

app.listen(process.env.PORT, () => {
  console.log("Server is Runninng.");
  
})