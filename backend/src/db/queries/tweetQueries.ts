import { db } from '../db';
import { groupTable, InsertGroup, InsertPost, InsertTweet, InsertUser, postsTable, tweetTable, usersTable } from '../schema';
import { eq, desc } from 'drizzle-orm';

export async function createTweet(data: InsertTweet) {
    console.log("data: ", data)
    await db.insert(tweetTable).values(data).returning()

    return data;
}

export async function getAllTweetSingleUser(userId: number) {
    console.log("userId: ", userId)
    return await db.select().from(tweetTable).where(eq(tweetTable.userId, userId)).execute();
}

export async function getallTweet() {
    return await db.select().from(tweetTable).orderBy(desc(tweetTable.createdAt))
}
