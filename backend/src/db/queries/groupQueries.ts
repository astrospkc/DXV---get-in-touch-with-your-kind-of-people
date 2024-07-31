import { db } from '../db';
import { groupTable, InsertGroup, InsertPost, InsertTweet, InsertUser, postsTable, tweetTable, usersTable } from './schema';
import { eq } from 'drizzle-orm';
export async function createGroup(data: InsertGroup) {
    console.log("group data: ", data)
    await db.insert(groupTable).values(data);
    return data
}