import express from "express";
import userRouter from "../routes/userRoutes"
import tweetRouter from "../routes/tweetRoutes"
import postRouter from "../routes/postRoutes"
import groupRouter from "../routes/groupRoutes"
import groupMemberRouter from "../routes/groupMemberRoute"

import cors from 'cors';


// import { db, users } from './schema'

const app = express();
app.use(express.json())
app.use(cors())



// route:1 -> create user
app.use("/api", userRouter)


// routes:2 --> create tweet
app.use("/tweet", tweetRouter)


// routes:3 --> create post
app.use("/post", postRouter)


// routes:4 --> create a group
app.use("/group", groupRouter)


// routes:5 --> create group members
app.use("/group_member", groupMemberRouter)





app.get("/", async (req, res) => {
    res.send("hi homepage ")
    console.log("this is homepage")
})
app.listen(8000, () => {
    console.log("Server started on port 8000");
});
