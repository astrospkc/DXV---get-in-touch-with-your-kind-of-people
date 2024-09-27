import { arrayContains, eq } from "drizzle-orm";
import { db } from "../db";
import { chat, InsertChat } from "../schema/index";
import { desc, asc } from 'drizzle-orm';


export async function createChat(data: InsertChat) {
    console.log("create chat  data: ", data)
    return await db.insert(chat).values(data)

}

export async function fetchChat(userId) {

    const data = await db.select().from(chat).where(arrayContains(chat.users, [userId]))
    // const data = await db.query.chat.findMany({
    //     where: (users) => {
    //         return arrayContains(users.users, [userId])
    //     }
    // })
    return data

}

// export async function createGroup_Chat(data: InsertChat) {
//     console.log("data: ", data)
//     const result = await db.insert(chat).values({...data, returning:{id:true}})
//     console.log("result: ", result)
//     return result

// }