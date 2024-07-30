import express from "express";
import { createUser, getUserInfo } from "./queries";
import { body, validationResult } from "express-validator"
import { error } from "console";
import createUserRouter from "../routes/userRoutes"

import getUserRouter from "../routes/userRoutes"

import cors from 'cors';


// import { db, users } from './schema'

const app = express();
app.use(express.json())
app.use(cors())



// route:1 -> create user
app.use("/api", createUserRouter)
// route:2 --> get user
app.use("/api", getUserRouter)

app.get("/", async (req, res) => {
    res.send("hi homepage ")
    console.log("this is homepage")
})
app.listen(8000, () => {
    console.log("Server started on port 8000");
});
