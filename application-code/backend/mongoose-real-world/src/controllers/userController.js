import User from "../models/User.js";

export async function getUsers(req, res, next) {
  try {
    const users = await User.find("name"= "Charlie")
    res.json(users)
  } catch (error) {
    next(error)
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({
      message: "User Not Found"
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export async function createUser(req, res, next) {
  try {
    const newuser = await User.create(req.body)
    res.status(201).json(newuser)
  } catch (error) {
    next(error)
  }
}

export async function updateUser(req, res, next) {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true});
    if (!updated) return res.status(404).json({message: "User Not Found"})
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

export async function deleteUser(req, res, next) {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({message: "User Not Found"})
      res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}