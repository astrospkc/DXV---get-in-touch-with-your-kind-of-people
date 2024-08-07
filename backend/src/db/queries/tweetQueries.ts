import { db } from '../db';
import { groupTable, InsertGroup, InsertPost, InsertTweet, InsertUser, postsTable, tweetTable, usersTable } from '../schema';
import { eq } from 'drizzle-orm';

export async function createTweet(data: InsertTweet) {
    console.log("data: ", data)
    await db.insert(tweetTable).values(data)

    return data;
}

export async function getTweet(userId: Number) {
    console.log("userId: ", userId)
    return await db.select().from(tweetTable).where(eq(tweetTable.userId, userId)).limit(1).execute();
}

export async function getallTweet() {
    return await db.select().from(tweetTable)
}
