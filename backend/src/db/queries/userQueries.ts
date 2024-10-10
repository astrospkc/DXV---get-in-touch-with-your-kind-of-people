import { db } from '../db';
import { InsertUsers, usersTable } from '../schema/index';
import { eq } from 'drizzle-orm';

// user queries: 



export async function createUser(data: InsertUsers) {
    await db.insert(usersTable).values(data);
    console.log("data: ", data)
    return data
}

export async function getUserInfoWithId(userId: number) {
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

export async function usersDetails(users_arr: number[]) {
    let arr = []
    for (let i = 0; i < users_arr.length; i++) {
        let data = await getUserInfoWithId(users_arr[i])
        arr.push(data[0])
    }

    return arr
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

export async function checkUser(username: string) {
    console.log("username : ", username)
    try {
        return await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1).execute()

    } catch (error) {
        return []


    }
}

