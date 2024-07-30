import express from 'express'

import { body, validationResult } from "express-validator";
import { createGroup } from '../db/queries'
// import { getTweet } from '../db/queries'

import { db } from '../db/db';
import { tweetTable, usersTable, postsTable, groupTable } from '../db/schema';
import { eq, and } from 'drizzle-orm';

// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
const router = express.Router()

// const JWT_SECRET = "secret"

// create tweet
async function createGroups(req: express.Request, res: express.Response) {
    console.log(req.body.groupAdminId)
    console.log(req.body)
    const { group_name, total_members, group_media_url, github_url, groupAdminId } = req.body;


    if (!group_name || !total_members || !github_url || !groupAdminId) {
        return res.status(400).json({ error: "All fields are required" })
    }

    // check if user exists or not
    const userExist = await db.select().from(usersTable).where(eq(usersTable.id, groupAdminId)).limit(1).execute()
    console.log("user exist: ", userExist)
    if (userExist.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    const group = await createGroup(
        {
            group_name: group_name,
            total_members: total_members,
            group_media_url: group_media_url,
            github_url: github_url,
            groupAdminId: groupAdminId
        }
    );
    console.log("group:", group)
    res.json(group);


}

// getting id by only entering the username ( its unique), and from the id fetching the content

// async function getPosts(req: express.Request, res: express.Response) {
//     try {

//         const postId = parseInt(req.params.postid)

//         console.log("id: ", postId)
//         const post = await getPost(postId);
//         console.log("post", post);
//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }
//         res.json(post);
//     } catch (error) {
//         res.status(500).json({ error: 'Error retrieving user information' });
//     }
// }
// router.get('/posts/:postid', getPosts);


router.post("/createGroup", createGroups);

export default router
