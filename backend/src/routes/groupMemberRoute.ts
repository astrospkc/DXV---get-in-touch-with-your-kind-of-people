import express from 'express'

import { body, validationResult } from "express-validator";
import { addGroupMembers, getGroupMemberdetails } from '../db/queries/groupMemberQueries'
// import { getTweet } from '../db/queries'

import { db } from '../db/db';
import { usersTable } from '../db/schema/index';
import { eq, and } from 'drizzle-orm';
import { get_groups } from '../db/queries/groupQueries';
import { group } from 'console';
import fetchuser from '../../middleware/fetchuser';

// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
const router = express.Router()

// // const JWT_SECRET = "secret"

// // create group

// // adding member to the group -> route: /addGroupMember --half done
// const addToGroup = async (req: express.Request, res: express.Response) => {

//     const { group_member_id, group_chat_id } = req.body

//     if (!group_member_id || !group_chat_id) {
//         return res.status(400).json({ error: "All fields are required" })
//     }

//     // const updatedChat = await db.update(chat).set({
//     //     users: [...chat.users, group_member_id]
//     // }).where(eq(chat.id, group_chat_id)).returning()

// }

// // removing member from the group -> route: /rempoveGroupMember
// const removeGroupMember = async (req: express.Request, res: express.Response) => {

// }


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

async function getGroupMemberDetails(req: express.Request, res: express.Response) {
    console.log(req.user)
    try {
        // first of all get the group info , then get the details through group_id
        const user_id = parseInt(req.user?.id ?? "");
        console.log("user id: ", user_id)
        const groups = await get_groups(user_id)
        console.log("groups: ", groups)
        const group_members = new Array();
        // now getting the details of the member using group_id
        for (let i = 0; i < groups.length; i++) {
            const group_id = groups[i]['group_id']
            console.log("group id: ", group_id)
            const groupMembers = await getGroupMemberdetails(group_id)

            group_members.push(groupMembers)

        }

        res.json(group_members)

    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving group member information' });
    }
}




router.post("/createGroupMember", addGroupMember);
router.get("/getAllGroupsOfUser/group_member_details", fetchuser, getGroupMemberDetails)

export default router;
