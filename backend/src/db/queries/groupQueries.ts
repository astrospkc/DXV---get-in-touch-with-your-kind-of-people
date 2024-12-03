import { groupMemberTable } from './../schema';
import { db } from '../db';
import { groupTable, InsertGroup, InsertPost, InsertTweet, InsertUsers, postsTable, tweetTable, usersTable } from '../schema';
import { eq, desc } from 'drizzle-orm';
import { syncBuiltinESMExports } from 'module';


export async function createGroup(data: InsertGroup) {
    console.log("group data: ", data)
    await db.insert(groupTable).values(data);
    return data
}

export async function getGroupDetail(groupId: number) {
    console.log("group id: ", groupId)
    return await db.select().from(groupTable).where(eq(groupTable.groupAdminId, groupId)).limit(1).execute();
}


// this get groups signifies all the groups that a user has created
export async function get_groups(userId: number) {
    console.log("groupId: ", userId)
    return await db.select().from(groupTable).where(eq(groupTable.groupAdminId, userId)).orderBy(desc(groupTable.createdAt)).execute()
}

export async function get_all_groups() {
    return await db.select().from(groupTable).orderBy(desc(groupTable.createdAt)).execute()
}

export async function get_all_groups_of_userAdmin(id: number) {
    return await db.select().from(groupTable).where(eq(groupTable.groupAdminId, id)).orderBy(desc(groupTable.createdAt)).execute()
}

// export async function getGroupDetailsWithName(groupName: string) {
//     const data = await db.select().from(groupTable).where(eq(groupTable.group_name, groupName)).limit(1).execute()
//     return data
// }

