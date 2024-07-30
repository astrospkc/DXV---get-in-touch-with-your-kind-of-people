import express from 'express'

import { body, validationResult } from "express-validator";
import { createTweet } from '../db/queries'
import { db } from '../db/db';

// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
const router = express.Router()

// const JWT_SECRET = "secret"

// create tweet
async function createTweets(req: express.Request, res: express.Response) {
    console.log(req.body)
    const { content, userId } = req.body;

    if (!content || !userId) {
        return res.status(400).json({ error: "All fields are required" })
    }
    const tweets = await createTweet(
        {
            content: content,
            userId: userId
        }


    );
    console.log("tweet:", tweets)


    res.json(tweets);
}

// async function getTweet(req: express.Request, res: express.Response) {
//     try {
//         const userId = parseInt(req.params.userId)

//         console.log("id: ", userId)
//         const user = await getUserInfo(userId);
//         console.log("user", user);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: 'Error retrieving user information' });
//     }
// }
// router.get('/users/:userid', getUser);


router.post("/insertTweets", createTweets);

export default router
