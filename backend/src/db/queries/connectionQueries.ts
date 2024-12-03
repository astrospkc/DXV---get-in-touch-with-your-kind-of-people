import { eq } from "drizzle-orm"
import { db } from "../db"
import { connectionTable, InsertConnection, usersTable } from "../schema"

type FollowersType = {
    follower_id: number,
    followee_id: number
}
export async function addFollower(data: InsertConnection) {
    console.log("data: ", data)
    await db.insert(connectionTable).values(data)
    return data
}

export async function followersInfo(data: FollowersType[]) {
    const users = data.map((user) => user.follower_id)

    let usersInfo_arr = []
    for (let i = 0; i < users.length; i++) {
        const data = await db.select().from(usersTable).where(eq(usersTable.id, users[i])).limit(1)
        usersInfo_arr.push(data[0])
    }
    return usersInfo_arr
}