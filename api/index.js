import  express from "express";
import { db } from './connect.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true)
   next()
   })

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(cookieParser())


app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/auth", authRoutes)


db.connect(function(err) {
    if (err) {
      console.error('Failed to connect to the database:', err);
      process.exit(1); // Exit with a failure code
    } else {
      console.log("Connected to the database!");
  
      // Start the Express server
      const PORT = 8800;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    }
  });