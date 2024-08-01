import { groupMemberTable } from './../schema';
import { db } from '../db';
import { groupTable, InsertGroup, InsertPost, InsertTweet, InsertUser, postsTable, tweetTable, usersTable } from '../schema';
import { eq } from 'drizzle-orm';


export async function createGroup(data: InsertGroup) {
    console.log("group data: ", data)
    await db.insert(groupTable).values(data);
    return data
}

export async function getGroupDetail(groupId: Number) {
    console.log("group id: ", groupId)
    return await db.select().from(groupTable).where(eq(groupTable.groupAdminId, groupId)).limit(1).execute();
}