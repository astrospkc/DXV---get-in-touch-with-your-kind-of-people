import express from 'express'

import { body, validationResult } from "express-validator";
import { createGroupMembers } from '../db/queries/groupMemberQueries'
// import { getTweet } from '../db/queries'

import { db } from '../db/db';
import { usersTable } from '../db/schema';
import { eq, and } from 'drizzle-orm';

// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
const router = express.Router()

// // const JWT_SECRET = "secret"

// // create group
async function createGroupMember(req: express.Request, res: express.Response) {
    console.log(req.body)

    const { group_member_id, group_id } = req.body


    if (!group_member_id || !group_id) {
        return res.status(400).json({ error: "All fields are required" })
    }

    // check if user exists or not
    const memberData = await db.select().from(usersTable).where(eq(usersTable.id, group_member_id)).limit(1).execute()
    console.log("member data: ", memberData)
    if (memberData.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    const groupMember = await createGroupMembers(
        {
            group_member_id: group_member_id,
            group_id: group_id,
            member_name: memberData[0].name,
            member_email: memberData[0].email,
            member_username: memberData[0].username
        }
    );
    console.log("group member:", groupMember)
    res.json(groupMember);


}

// // getting id by only entering the username ( its unique), and from the id fetching the content

// // async function getPosts(req: express.Request, res: express.Response) {
// //     try {

// //         const postId = parseInt(req.params.postid)

// //         console.log("id: ", postId)
// //         const post = await getPost(postId);
// //         console.log("post", post);
// //         if (!post) {
// //             return res.status(404).json({ error: 'Post not found' });
// //         }
// //         res.json(post);
// //     } catch (error) {
// //         res.status(500).json({ error: 'Error retrieving user information' });
// //     }
// // }
// // router.get('/posts/:postid', getPosts);


router.post("/createGroupMember", createGroupMember);

export default router;
