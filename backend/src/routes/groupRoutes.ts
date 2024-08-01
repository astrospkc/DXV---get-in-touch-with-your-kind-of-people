import express from 'express'

import { body, validationResult } from "express-validator";
import { createGroup, getGroupDetail } from '../db/queries/groupQueries'


import { db } from '../db/db';
import { usersTable } from '../db/schema';
import { eq, and } from 'drizzle-orm';


const router = express.Router()



// create group
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

// getting the group information

async function getGroupInfo(req: express.Request, res: express.Response) {
    try {

        const groupId = parseInt(req.params.groupid)

        console.log("id: ", groupId)
        const group = await getGroupDetail(groupId);
        console.log("group", group);
        if (!group) {
            return res.status(404).json({ error: 'group not found' });
        }
        res.json(group);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user information' });
    }
}
router.get('/groups/:groupid', getGroupInfo);


router.post("/createGroup", createGroups);

export default router
