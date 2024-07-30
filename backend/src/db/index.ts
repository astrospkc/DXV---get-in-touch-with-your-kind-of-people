import express from "express";
import createUserRouter from "../routes/userRoutes"

import getUserRouter from "../routes/userRoutes"
import createTweetRouter from "../routes/tweetRoutes"
import getTweetRouter from "../routes/tweetRoutes"
import createPostRouter from "../routes/postRoutes"
import getPostRouter from "../routes/postRoutes"
import createGroupRouter from "../routes/postRoutes"





import cors from 'cors';


// import { db, users } from './schema'

const app = express();
app.use(express.json())
app.use(cors())



// route:1 -> create user
app.use("/api", createUserRouter)
// route:2 --> get user
app.use("/api", getUserRouter)

// routes:3 --> create tweet
app.use("/api", createTweetRouter)

// routes:4 -->get tweet
app.use("/api", getTweetRouter)

// routes:5 --> create post
app.use("/api", createPostRouter)

// routes:6 --> get post
app.use("/api", getPostRouter)


// routes:6 --> create a group
app.use("/api", createGroupRouter)






app.get("/", async (req, res) => {
    res.send("hi homepage ")
    console.log("this is homepage")
})
app.listen(8000, () => {
    console.log("Server started on port 8000");
});
