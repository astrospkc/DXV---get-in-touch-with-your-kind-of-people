import express from 'express'

import { body, validationResult } from "express-validator";
import { createTweet } from '../db/queries'
import { getTweet } from '../db/queries'

import { db } from '../db/db';
import { tweetTable, usersTable } from '../db/schema';
import { eq, and } from 'drizzle-orm';

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

    // check if user exists or not
    const userExist = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1).execute()
    console.log("user exist: ", userExist)
    if (userExist.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    const tweetExists = await db
        .select()
        .from(tweetTable)
        .where(eq(tweetTable.userId, userId))
        .limit(1)
        .execute();

    console.log("tweet exist: ", tweetExists)

    // if content in the tweetexist or not
    if (tweetExists.length != 0) {
        if (tweetExists[0]['content'].length > 0) {
            return res.status(409).json({ error: "Tweet with the same content already exists for this user" });
        }
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

// getting id by only entering the username ( its unique), and from the id fetching the content

async function getTweets(req: express.Request, res: express.Response) {
    try {

        const userId = parseInt(req.params.userId)

        console.log("id: ", userId)
        const tweet = await getTweet(userId);
        console.log("tweet", tweet);
        if (!tweet) {
            return res.status(404).json({ error: 'Tweet not found' });
        }
        res.json(tweet);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user information' });
    }
}
router.get('/tweeets/:tweetid', getTweets);


router.post("/insertTweets", createTweets);

export default router
