import { groupMemberTable, InsertMember } from './../schema';
import { db } from '../db';
import { groupTable, InsertGroup, InsertPost, InsertTweet, InsertUser, postsTable, tweetTable, usersTable } from '../schema';
import { eq } from 'drizzle-orm';


export async function addGroupMembers(data: InsertMember) {
    console.log("group data: ", data)
    await db.insert(groupMemberTable).values(data);
    return data
}

export async function getGroupMemberdetails(groupId: Number) {
    console.log("group id: ", groupId)
    return await db.select().from(groupMemberTable).where(eq(groupMemberTable.group_id, groupId)).execute();
}