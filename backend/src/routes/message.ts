
import express from 'express'
import fetchuser from '../../middleware/fetchuser'

import { db } from '../db/db'
import { fetchAllMessagesById, sendMessage } from '../db/queries/messageQueries'
import { desc, eq } from 'drizzle-orm';
import { chat, message } from '../db/schema/index';

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


            // now here I want to update the content in the message table
            const msg1 = await db.insert(message).values({
                sender: parseInt(req.user?.id ?? ''),
                content: content,
                chat: chatId
            }).returning()
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
        res.status(200).json({ messages: allMessages })

    } catch (error) {
        throw new Error("messages not fetched")
    }
}


router.post("/sendMessage", fetchuser, SendMessage)
router.get("/fetchMessages/:id", fetchuser, FetchAllMessages)

export default router
