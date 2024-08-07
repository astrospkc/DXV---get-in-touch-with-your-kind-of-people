import express from 'express'

import { body, validationResult } from "express-validator";
import { createPost, getPost } from '../db/queries/postsQueries'
import { getTweet } from '../db/queries/tweetQueries'

import { db } from '../db/db';
import { tweetTable, usersTable, postsTable } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import fetchuser from '../../middleware/fetchuser';

// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
const router = express.Router()

// const JWT_SECRET = "secret"

// create tweet
async function createPosts(req: express.Request, res: express.Response) {
    console.log(req.body)
    const { title, content, userId, media_url } = req.body;


    if (!title || !content || !userId) {
        return res.status(400).json({ error: "All fields are required" })
    }

    // check if user exists or not
    const userExist = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1).execute()
    console.log("user exist: ", userExist)
    if (userExist.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    const postExists = await db
        .select()
        .from(postsTable)
        .where(eq(postsTable.userId, userId))
        .limit(1)
        .execute();

    console.log("post exist: ", postExists)

    // if content in the tweetexist or not
    if (postExists.length != 0) {
        if (postExists[0]['title'].length > 0 || postExists[0]['content'].length > 0) {
            return res.status(409).json({ error: "Tweet with the same content already exists for this user" });
        }
    }


    const posts = await createPost(
        {
            title: title,
            content: content,
            media_url: media_url,
            userId: userId
        }
    );
    console.log("post:", posts)
    res.json(posts);


}

// getting id by only entering the username ( its unique), and from the id fetching the content

async function getPosts(req: express.Request, res: express.Response) {
    try {

        const postId = parseInt(req.params.postid)

        console.log("id: ", postId)
        const post = await getPost(postId);
        console.log("post", post);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user information' });
    }
}
router.get('/posts/:postid', fetchuser, getPosts);


router.post("/insertPosts", fetchuser, createPosts);

export default router
