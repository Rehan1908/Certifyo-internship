export function errorHandler (err,req,res,next) {
  console.error(err)
  if (err.name === "ValidationError") {
    return res.status(400).json({message: "Validation Error", Errors : err.errors})
  }
  res.status(500).json("Internal Server Error")
}