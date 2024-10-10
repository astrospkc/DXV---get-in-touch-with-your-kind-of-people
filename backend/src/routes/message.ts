
import express from 'express'
import fetchuser from '../../middleware/fetchuser'

import { db } from '../db/db'
import { fetchAllMessagesById, sendMessage } from '../db/queries/messageQueries'
import { desc, eq } from 'drizzle-orm';
import { chat, message } from '../db/schema/index';
import { fetchChatDetails } from '../db/queries/chatQueries';
import { getUserInfoWithId, usersDetails } from '../db/queries/userQueries';

const router = express.Router()


// send message
const SendMessage = async (req: express.Request, res: express.Response) => {
    const { content, chatId } = req.body
    if (!chatId || !content) {
        res.status(400).send("all the fields are required")
    }


    try {
        // check if the chatId is present or not in the chat table
        // if present then update the latest message
        const chatIdExist = await db.select().from(chat).where(eq(chat.id, chatId)).limit(1).execute()
        console.log("chatIdExist:", chatIdExist)
        if (chatIdExist.length > 0) {
            // it updates the chat table with latestmessage column
            await db.update(chat).set({
                latestMessage: chatId
            }).execute()

            let msgDetails = [];
            // now here I want to update the content in the message table
            // message info : contains-> id, sender, content, chat, createdAt
            const sender_id = parseInt(req.user?.id ?? '')
            const sender_data = await getUserInfoWithId(sender_id)

            // chat details with chatId
            const chatDetails = fetchChatDetails(chatId)
            const msg1 = await db.insert(message).values({
                sender_id: parseInt(req.user?.id ?? ''),
                sender: sender_data,
                content: content,
                chat: chatDetails
            }).returning()
            console.log("msg1: ", msg1)
            // msgDetails.push({ msg: msg1[0] })


            // // chat info
            // const chat_id: number = msg1[0].chat
            // const chatdetails = await fetchChatDetails(chat_id)

            // // getting the user details and pushing it to the msgDetails
            // const users_arr = chatdetails.chat.users
            // console.log("array: ", users_arr)
            // const usersDetails_arr = await usersDetails(users_arr)


            // // getting the admin details
            // const admin = usersDetails_arr[usersDetails_arr.length - 1]

            // const data = {
            //     id: msg1[0].id,
            //     chatName: chatdetails.chat.chatName,
            //     isGroupChat: chatdetails.chat.isGroupChat,
            //     users: usersDetails_arr,
            //     latestMessage: msg1[0].content,
            //     groupAdmin: {
            //         id: admin.id,
            //         name: admin.name,
            //         username: admin.username,
            //         email: admin.email,
            //         pic: admin.media_url
            //     }
            // }

            res.status(200).send(msg1)
        } else {
            res.status(400).send("chat not found, no msg can be inserted")
        }



    } catch (error) {
        console.error("Error sending message: ", error)
        throw new Error("message not sent")
    }
}

//all message

export const FetchAllMessages = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const numericId = parseInt(id, 10)
    console.log("id: ", typeof id, "numericId: ", numericId)
    try {
        // fetching all messages using chatId in descending order
        // const allMessages = await db.select().from(message).orderBy(desc(message.createdAt)).where(eq(message.chat, numericId)).execute()
        const allMessages = await fetchAllMessagesById(numericId)
        // id , sender, content, chat, createdAt
        let data = {
            id: allMessages
        }
        res.status(200).json({ messages: allMessages })

    } catch (error) {
        throw new Error("messages not fetched")
    }
}


router.post("/sendMessage", fetchuser, SendMessage)
router.get("/fetchMessages/:id", fetchuser, FetchAllMessages)

export default router
