import dotenv from "dotenv"
import app from "./src/app.js"
import {ConnectDB} from "./src/config/db.js"

dotenv.config()

const PORT = process.env.PORT || 3000

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Failed to connect to MongoDB:", error);
  process.exit(1);
});
