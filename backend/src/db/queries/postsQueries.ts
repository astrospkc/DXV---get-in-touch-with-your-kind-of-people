import { db } from '../db';
import { groupTable, InsertGroup, InsertPost, InsertTweet, InsertUser, postsTable, tweetTable, usersTable } from './schema';
import { eq } from 'drizzle-orm';

export async function createPost(data: InsertPost) {
    console.log("data: ", data)
    await db.insert(postsTable).values(data)
    return data
}

export async function getPost(userId: Number) {
    console.log("userId: ", userId)
    return await db.select().from(postsTable).where(eq(postsTable.userId, userId)).limit(1).execute()
}
