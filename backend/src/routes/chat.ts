import { message } from './../db/schema/message';
import { chat, usersTable, message } from './../db/schema/index';
import { and, arrayContains } from 'drizzle-orm';
import express from 'express'
import { db } from '../db/db'
import fetchuser from '../../middleware/fetchuser';
import { eq } from 'drizzle-orm';
import { checkChat, createChat, fetchChat, fetchChatDetails, fetchChatDetailsByName } from '../db/queries/chatQueries';
import { getUserInfoWithId, usersDetails } from '../db/queries/userQueries';
import { fetchAllMessagesById } from '../db/queries/messageQueries';
import { group } from 'console';


// import { body, validationResult } from "express-validator";

const router = express.Router()

// creating chat -> route: /createChat
async function AccessChat(req: express.Request, res: express.Response, next: express.NextFunction) {
    // geetting the userId from the body
    const { userId } = req.body;

    const u_id = parseInt(req.user?.id ?? ''); // Assuming req.user is an object with an id property
    console.log("sender_id: ", userId, "and receiver_id: ", u_id)
    try {
        // Checking if the chat already exists
        console.log("checking the chat already exists or not")


        // this is the trial section - >
        // 1. checking if the chat already exists
        const isChat = await checkChat(u_id, userId)
        console.log("is chat: ", isChat)

        // if exist then return the chat and user details 
        if (isChat?.length > 0) {
            // let userDetails: any[] = []
            console.log(isChat[0].users)
            const userIds = isChat[0].users

            const userDetails = await usersDetails(userIds ? userIds : []);
            let data = {
                id: isChat[0].id,
                chatName: isChat[0].chatName,
                isGroupChat: isChat[0].isGroupChat,
                users: userIds,
                usersInfo: userDetails,
                latestMessage: isChat[0].latestMessage,
                groupAdmin: userDetails ? userDetails[0] : null,
                createdAt: isChat[0].createdAt
            }

            return res.status(200).json({ success: true, chat: data })
        }

        // If chat does not exist, create a new chat
        if (isChat?.length === 0 && u_id !== undefined) {
            // Logic to create a new chat
            let users = [u_id];
            if (u_id != userId) {
                users.push(userId)
            }

            const chatName = await db.select({ username: usersTable.username }).from(usersTable).where(eq(usersTable.id, userId))
            console.log("chatname: ", chatName)

            // fetching the user details with users which contains userIds
            let userDetails = await usersDetails(users)
            console.log("user details of the new chat: ", userDetails)

            const admin = await getUserInfoWithId(u_id)
            const newChat = await createChat({ chatName, admin, users, userDetails })

            console.log("new chat: ", newChat)

            return res.status(200).json({ chat: newChat });

            // return res.status(201).json({ chat: newChat, users: userDetails });
        } else {
            return res.status(404).json({ message: "groupAdmin  undefined" });
        }

    } catch (error: any) {
        res.status(500).json({ message: "Error creating chat", error: error.message });
    }
}


// getting  all the chats linked with the user -> route: /fetchChat
// when fetching chat , all the users must have latest Message , 
// - chatid
// fetch all messages using chatid
// return -> id, chatName, isGroupChat, groupAdmin details, users details, latestMessages and senders details.


async function FetchChats(req: express.Request, res: express.Response) {
    const userId = parseInt(req.user?.id ?? '')
    try {
        const chats = await fetchChat(userId)
        console.log("chats: ", chats)

        // getting the result of chatId:
        let chatId
        if (chats.length > 0) {
            chatId = chats[0].latestMessage
        }

        if (chatId) {
            const latestMessageRes = await fetchAllMessagesById(chatId)
            console.log("latestmessage res: ", latestMessageRes)
            res.status(200).send(latestMessageRes)
        } else {
            return res.status(404).json({ message: "chatId is null" });
        }
    } catch (error) {
        console.error("Error fetching chats: ", error)
        res.status(500).json({ message: "Error fetching chats" });
    }
}

// fetch all the chats which the user is linked with
//result contains
// users, groupAdmin, latestMessage, senders-> name , email and pic
// route: /fetchUsersChats
async function fetchUsersChats(req: express.Request, res: express.Response) {
    const userId = parseInt(req.user?.id ?? '')
    try {
        const chats = await fetchChat(userId)
        const chatId = chats[0].latestMessage
        if (chatId) {
            const latestMessageRes = await fetchAllMessagesById(chatId)
            res.status(200).send(latestMessageRes)
        } else {
            return res.status(404).json({ message: "chatId is null" });
        }
    } catch (error) {
        console.error("Error fetching chats: ", error)
        res.status(500).json({ message: "Error fetching chats" });
    }
}


// creating group chat -> route: /createGroupChat
const CreateGroupChat = async (req: express.Request, res: express.Response) => {
    if (!Array.isArray(req.body.users) || !req.body.chatName) {
        res.status(400).send("Please fill allthe fields")
    }
    var users = req.body.users

    const present = async () => {
        let result = []
        for (let i = 0; i < users.length; i++) {
            const data = await db.select().from(usersTable).where(eq(usersTable.id, users[i])).limit(1)
            result.push(data.length > 0)
        }

        console.log("result: ", result)
        return result.every(exists => exists)
    }
    const val = await present()
    console.log("present: ", val)

    if (val == true) {



        // var users = JSON.parse(req.body.users)
        if (users.length < 2) {
            res.status(400).send("more than 2 users are required to form a group")

        }
        users.push(parseInt(req.user?.id ?? ''))

        console.log("req.body.chatName: ", req.body.chatName)
        const users_info = await usersDetails(users)

        try {
            //creating group chat with chatName, users,isGroupChat - true, groupAdmin- req.user
            const groupChat = await db.insert(chat).values({
                chatName: req.body.chatName,
                users: users,
                usersInfo: users_info,
                isGroupChat: true,
                groupAdmin: users_info ? users_info[users_info.length - 1] : req.user?.id
            }).returning();
            console.log("groupchat: ", groupChat)
            res.status(200).json({ chat: groupChat })

        } catch (error: unknown) {
            console.error("Error creating group chat:  ", error)
            res.status(500).json({ message: "Error creating a group chat" });
        }
    } else {
        res.status(400).send({ message: "please enter valid user" })
    }
}

// renaming the group chat -> route: /renameGroup
const RenameGroup = async (req: express.Request, res: express.Response) => {
    const { chatId, chatName } = req.body
    const updatedName = await db.update(chat).set({ chatName: chatName }).where(eq(chat.id, chatId)).returning({ chatName: chat.chatName, users: chat.users, latestMessage: chat.latestMessage, groupAdmin: chat.groupAdmin })

    if (!updatedName) {
        res.status(404);
        throw new Error("chat not found while renaming the group");
    } else {
        res.status(200).send(updatedName);
    }
}

// fetch chat details by chatId -> route: /chatDetails/:id
const FetchChatDetails = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const numericId = parseInt(id, 10)
    try {
        const chatdetails = await fetchChatDetails(numericId)
        console.log("chat details: ", chatdetails)
        res.status(200).json({ chat: chatdetails })
        // return chatdetails

    } catch (error) {
        console.error("error fetching the chat details: ", error)
    }
}

const FetchChatDetailsWithName = async (req: express.Request, res: express.Response) => {
    const { name } = req.params
    try {
        const data = await fetchChatDetailsByName(name)
        // console.log("chat  data: ", data)
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
    }
}



router.get("/chatDetails/:id", fetchuser, FetchChatDetails)
router.post("/createChat", fetchuser, AccessChat)
router.get("/fetchChats", fetchuser, FetchChats)
router.get("/fetchUsersChats", fetchuser, fetchUsersChats)
router.post("/createGroupChat", fetchuser, CreateGroupChat)
router.put("/renameGroup", fetchuser, RenameGroup)
router.get("/fetchChatDetails/:name", fetchuser, FetchChatDetailsWithName)

export default router