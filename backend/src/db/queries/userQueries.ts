import { db } from '../db';
import { groupTable, InsertGroup, InsertPost, InsertTweet, InsertUser, postsTable, tweetTable, usersTable } from '../schema';
import { eq } from 'drizzle-orm';

// user queries: 

export async function createUser(data: InsertUser) {
    await db.insert(usersTable).values(data);
    console.log("data: ", data)
    return data
}

export async function getUserInfo(userId: Number) {
    console.log("userId: ", userId)
    // return await db.select({id, name, username, media_url}).from(usersTable).where(eq(usersTable.id, userId)).limit(1).execute();
    try {
        const result = await db.select({
            id: usersTable.id,
            name: usersTable.name,
            username: usersTable.username,
            email: usersTable.email,
            media_url: usersTable.media_url
        }).from(usersTable).where(eq(usersTable.id, userId)).limit(1).execute()
        return result

    } catch (error) {
        console.error('Error fetching user info:', error);
        throw new Error('Failed to fetch user information');
    }
}

export async function getallUsers() {
    try {
        const result = await db.select({
            id: usersTable.id,
            name: usersTable.name,
            username: usersTable.username,
            email: usersTable.email,
            media_url: usersTable.media_url
        }).from(usersTable).execute()
        return result

    } catch (error) {
        console.error('Error fetching user info:', error);
        throw new Error('Failed to fetch user information');
    }
}

export async function checkUser(username: String) {
    console.log("username : ", username)
    try {
        return await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1).execute()

    } catch (error) {
        return []


    }
}

