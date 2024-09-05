import { db } from "../db";
import { chat, InsertChat } from "../schema";


export async function createChat(data: InsertChat) {
    await db.insert(chat).values(data)
    return data
}