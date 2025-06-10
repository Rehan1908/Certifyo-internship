import express from "express"
import UserRoutes from "./routes/userRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js"

const app = express()
app.use (express.json())

app.use ("/users", UserRoutes)
app.use(errorHandler)
export default app