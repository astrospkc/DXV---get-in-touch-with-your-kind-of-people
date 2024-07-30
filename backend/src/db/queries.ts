import { db } from './db';
import { InsertTweet, InsertUser, tweetTable, usersTable } from './schema';
import { eq } from 'drizzle-orm';

// user queries: 

export async function createUser(data: InsertUser) {
    await db.insert(usersTable).values(data);
    console.log("data: ", data)
    return data
}

export async function getUserInfo(userId: Number) {
    console.log("userId: ", userId)
    return await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1).execute();
}


// tweet queries

export async function createTweet(data: InsertTweet) {
    await db.insert(tweetTable).values(data)
    console.log("data: ", data)
    return data;
}

export async function getTweet(userId: Number) {
    console.log("userId: ", userId)
    return await db.select().from(tweetTable).where(eq(tweetTable.userId, userId)).limit(1).execute();
}