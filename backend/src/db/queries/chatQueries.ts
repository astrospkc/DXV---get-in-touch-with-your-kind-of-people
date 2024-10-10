import { arrayContains, eq } from "drizzle-orm";
import { db } from "../db";
import { chat, InsertChat } from "../schema/index";
import { desc, asc } from 'drizzle-orm';

// careating chat 
export async function createChat(data: InsertChat) {
    console.log("create chat  data: ", data)
    return await db.insert(chat).values(data)

}

// fetching chat with chat id
export async function fetchChat(userId: number) {

    const data = await db.select().from(chat).where(arrayContains(chat.users, [userId]))
    return data

}

// chat details using chatId
export async function fetchChatDetails(chatId: number) {

    const chatDetails = await db.select().from(chat).where(eq(chat.id, chatId)).limit(1).execute()
    return { chat: chatDetails[0] }
}

// export async function createGroup_Chat(data: InsertChat) {
//     console.log("data: ", data)
//     const result = await db.insert(chat).values({...data, returning:{id:true}})
//     console.log("result: ", result)
//     return result

// }