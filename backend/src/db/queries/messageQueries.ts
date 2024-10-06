
import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { InsertMsg, message } from "../schema/index";



export async function sendMessage(data: InsertMsg) {
    console.log("create chat  data: ", data)
    return await db.insert(message).values(data).returning()

}

export async function allMessages() {
    const data = await db.select().from(message).execute()
    return data
}
export const fetchAllMessagesById = async (id: Number) => {
    try {
        const allMessages = await db.select().from(message).orderBy(desc(message.createdAt)).where(eq(message.chat, id)).execute()
        return allMessages
    } catch (error) {
        throw new Error("messages not fetched")


    }
}