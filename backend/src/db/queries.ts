import { db } from './db';
import { groupTable, InsertGroup, InsertPost, InsertTweet, InsertUser, postsTable, tweetTable, usersTable } from './schema';
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
    console.log("data: ", data)
    await db.insert(tweetTable).values(data)

    return data;
}

export async function getTweet(userId: Number) {
    console.log("userId: ", userId)
    return await db.select().from(tweetTable).where(eq(tweetTable.userId, userId)).limit(1).execute();
}

// posts queries

export async function createPost(data: InsertPost) {
    console.log("data: ", data)
    await db.insert(postsTable).values(data)
    return data
}

export async function getPost(userId: Number) {
    console.log("userId: ", userId)
    return await db.select().from(postsTable).where(eq(postsTable.userId, userId)).limit(1).execute()
}

// create a group

export async function createGroup(data: InsertGroup) {
    console.log("group data: ", data)
    await db.insert(groupTable).values(data);
    return data
}