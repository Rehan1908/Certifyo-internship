import express from "express"

const app = express()

app.listen(3000, (req, res) => {
  console.log("server is running on port 3000")
})

app.get ("/",(req,res) => {
  res.send("Hello World")
})

app.post ("/ids", (req,res) => {
  ids = req.params
  store (ids)
})

app.put ("/updateids", (req,res) => {
  ids = req.params
  ids = store (req.params)
})