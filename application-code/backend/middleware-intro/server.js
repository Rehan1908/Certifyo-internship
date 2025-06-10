import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"

const app = express()

app.use (helmet());
app.use(cors())


app.use  (bodyParser.json());

app.use (morgan("common"))

app.get("/", (req,res)=> {
  res.json({status: "okay"})
})

app.post("/echo", (req,res)=> {
  res.json({youSent: req.body})
})

app.listen(3000, () => {
  console.log("Server is Running");
  
})