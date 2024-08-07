import express from 'express'

import { body, validationResult } from "express-validator";
import { addGroupMembers } from '../db/queries/groupMemberQueries'
// import { getTweet } from '../db/queries'

import { db } from '../db/db';
import { usersTable } from '../db/schema';
import { eq, and } from 'drizzle-orm';

// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
const router = express.Router()

// // const JWT_SECRET = "secret"

// // create group
async function addGroupMember(req: express.Request, res: express.Response) {

    console.log(req.body)
    try {
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

        const groupMember = await addGroupMembers(
            {
                group_member_id: group_member_id,
                group_id: group_id,

            }
        );
        console.log("group member:", groupMember)
        res.json(groupMember);
    } catch (error) {
        console.error("Error adding group member: check if the group_id  is present in the table or not ", error); // Log the error for debugging
        return res.status(500).json({ error: ' Error creating member information -> check if the group_id  is present in the table or not' });;
    }



}




router.post("/createGroupMember", addGroupMember);

export default router;
