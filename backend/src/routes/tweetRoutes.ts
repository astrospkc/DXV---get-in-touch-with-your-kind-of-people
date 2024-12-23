import express from 'express'
import { createTweet, getallTweet, getAllTweetSingleUser } from '../db/queries/tweetQueries'
import { db } from '../db/db';
import { tweetTable, usersTable } from '../db/schema/index';
import { eq } from 'drizzle-orm';
import fetchuser from '../../middleware/fetchuser';
import { getUserInfoWithId } from '../db/queries/userQueries';
const router = express.Router()

// create tweet
async function createTweets(req: express.Request, res: express.Response) {
    console.log(req.body)
    const { content } = req.body;
    const userId = parseInt(req.user?.id ?? "");


    if (!content) {
        return res.status(400).json({ error: "All fields are required" })
    }

    // check if user exists or not
    const userExist = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1).execute()
    console.log("user exist: ", userExist)
    if (userExist.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    const user_data = await getUserInfoWithId(userId)

    const tweets = await createTweet(
        {
            content: content,
            userId: userId,
            userInfo: user_data,
            createdAt: new Date(),
            updatedAt: new Date()

        }
    );
    console.log("tweet:", tweets)
    res.json(tweets);


}

// getting id by only entering the username ( its unique), and from the id fetching the content

async function getUserTweets(req: express.Request, res: express.Response) {
    try {

        const tweetId = parseInt(req.user?.id ?? '');

        console.log("id: ", tweetId)
        const tweet = await getAllTweetSingleUser(tweetId);
        console.log("tweet", tweet);
        if (!tweet) {
            return res.status(404).json({ error: 'Tweet not found' });
        }
        res.json(tweet);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user information' });
    }
}
// getting all the tweets that's stored in the database
async function getAllTweets(req: express.Request, res: express.Response) {
    try {

        const tweets = await getallTweet();
        console.log("tweets", tweets);
        if (!tweets) {
            return res.status(404).json({ error: 'Tweet not found' });
        }
        res.json(tweets);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user information' });
    }
}


router.get('/user_tweets', fetchuser, getUserTweets);
router.get('/tweets', getAllTweets)
router.post("/insertTweets", fetchuser, createTweets);

export default router
