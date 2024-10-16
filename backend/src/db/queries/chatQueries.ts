import { arrayContains, eq, and } from "drizzle-orm";
import { db } from "../db";
import { chat, InsertChat } from "../schema/index";
import { desc, asc } from 'drizzle-orm';


// careating chat 
export async function createChat({ chatName, admin, users, userDetails }: any) {

    return await db.insert(chat).values(
        {
            chatName: chatName[0].username,
            isGroupChat: false,
            groupAdmin: admin[0], // 
            users: users,
            usersInfo: userDetails


        }).returning();

}

// check chat with the id , already exist or not
export async function checkChat(u_id: number, id: number) {

    const data = await db.query.chat.findMany({
        where: (users) => {
            return and(eq(users.isGroupChat, false),
                arrayContains(users.users, [u_id, id]))
        },
    })
    return data
}

// fetching chat with chat id
export async function fetchChat(userId: number) {

    const data = await db.select().from(chat).where(arrayContains(chat.users, [userId]))
    return data

}

// chat details using chatId
export async function fetchChatDetails(chatId: number) {

    const chatDetails = await db.select().from(chat).where(eq(chat.id, chatId)).limit(1).execute()
    return chatDetails
}

// export async function createGroup_Chat(data: InsertChat) {
//     console.log("data: ", data)
//     const result = await db.insert(chat).values({...data, returning:{id:true}})
//     console.log("result: ", result)
//     return result

// }
export async function fetchChatDetailsByName(chatName: string) {
    const data = await db.select().from(chat).where(eq(chat.chatName, chatName)).limit(1).execute()
    return data
}