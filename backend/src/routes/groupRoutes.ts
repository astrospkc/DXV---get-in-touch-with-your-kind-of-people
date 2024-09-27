import express from 'express'
import { createGroup, get_all_groups, get_groups, getGroupDetail } from '../db/queries/groupQueries'
import { db } from '../db/db';
import { usersTable } from '../db/schema/index';
import { eq } from 'drizzle-orm';
import fetchuser from '../../middleware/fetchuser';
import { getUserInfo } from '../db/queries/userQueries';
const router = express.Router()


// create group
async function createGroups(req: express.Request, res: express.Response) {
    // console.log(req.user?.groupAdminId)
    console.log(req.body)
    const { group_name, total_members, group_media_url, github_url } = req.body;
    console.log("admin id: ", req.user?.id)

    if (!group_name || !total_members || !github_url) {
        return res.status(400).json({ error: "All fields are required" })
    }

    let admin_id = parseInt(req.user?.id ?? '0');


    // check if user exists or not
    const userExist = await db.select().from(usersTable).where(eq(usersTable.id, admin_id)).limit(1).execute()
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
            groupAdminId: admin_id,
            project_desc: req.body.project_desc
        }
    );
    console.log("group:", group)
    res.json(group);


}

// get all groups

async function getAllGroups(req: express.Request, res: express.Response) {
    try {
        const groups = await get_all_groups()
        console.log("groups: ", groups)
        if (!groups) {
            return res.status(404).json({ error: 'group not found' })
        }
        res.json(groups)

    } catch (error) {
        res.status(500).json({ error: 'Error retrieving groups information' });
    }
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

async function getAllGroupsOfUser(req: express.Request, res: express.Response) {
    try {
        // how to get all the groups created by this single user
        // 1. get the user id
        // 2. get the groups which will contain the group_id , and from that group_id we can get the group member details along with the group_name and all the group details
        const user_id = parseInt(req.user?.id ?? '');
        console.log("user id: ", user_id)
        const groups = await get_groups(user_id)
        console.log("groups: ", groups)
        console.log("groups length: ", groups.length)

        res.json(groups)

    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving groups information' });
    }
}

async function getUserIdInfo(req: express.Request, res: express.Response) {
    try {
        const userId = parseInt(req.params.userId ?? '')
        console.log("user id: ", userId)
        const user = await getUserInfo(userId)
        console.log("user", user)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user)

    } catch (error) {
        console.log("error : ", error)
        console.error(error)
    }
}
router.get('/groups/:groupid', fetchuser, getGroupInfo);


router.post("/createGroup", fetchuser, createGroups);
router.get("/getAllGroupsOfUser", fetchuser, getAllGroupsOfUser);
router.get('/getAllGroups', getAllGroups)
router.get("/getSingleUserInfo/:userId", getUserIdInfo)

export default router
