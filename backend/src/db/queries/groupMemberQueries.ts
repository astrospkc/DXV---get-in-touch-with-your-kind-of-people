import { groupMemberTable, InsertMember } from './../schema';
import { db } from '../db';
import { groupTable, InsertGroup, InsertPost, InsertTweet, InsertUser, postsTable, tweetTable, usersTable } from '../schema';
import { eq } from 'drizzle-orm';


export async function addGroupMembers(data: InsertMember) {
    console.log("group data: ", data)
    // get users-> group-id
    // append member id to the users

    // users_arr.push(data.group_member_id)

    await db.insert(groupMemberTable).values(data);

    return data
}
export async function getGroupMemebersId(data: InsertMember) {
    // await db.insert(groupMemberTable).values(data);
    const users_arr = await db.select().from(groupMemberTable).where(eq(groupMemberTable.group_id, data.group_id)).execute();
    console.log("users_arr", users_arr)
    let members = [];
    for (let user of users_arr) {
        members.push(user.group_member_id)
    }
    console.log("members: ", members)
    return members

}

export async function getGroupMemberdetails(groupId: Number) {
    console.log("group id: ", groupId)
    return await db.select().from(groupMemberTable).where(eq(groupMemberTable.group_id, groupId)).execute();
}