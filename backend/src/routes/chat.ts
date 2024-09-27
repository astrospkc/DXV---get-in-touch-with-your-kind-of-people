import { chat, usersTable, message } from './../db/schema/index';
import { and, arrayContains } from 'drizzle-orm';
import express from 'express'
import { db } from '../db/db'
import fetchuser from '../../middleware/fetchuser';
import { eq } from 'drizzle-orm';
import { fetchChat } from '../db/queries/chatQueries';
import { getUserInfo } from '../db/queries/userQueries';

// import { body, validationResult } from "express-validator";

const router = express.Router()

// creating chat -> route: /createChat
async function CreateChat(req: express.Request, res: express.Response, next: express.NextFunction) {
    // geetting the userId from the body
    const { userId } = req.body;

    const u_id = req.user?.id; // Assuming req.user is an object with an id property
    console.log("sender_id: ", userId, "and receiver_id: ", u_id)
    try {
        // Checking if the chat already exists
        console.log("checking the chat already exists or not")


        // this is the trial section - >
        // 1. checking if the chat already exists
        const isChat = await db.query.chat.findMany({
            where: (users) => {

                return and(eq(users.isGroupChat, false),
                    arrayContains(users.users, [u_id, userId]))
            },
        })



        console.log("is chat: ", isChat)


        // if exist then return the chat and user details 
        if (isChat?.length > 0) {
            let userDetails: any[] = []
            console.log(isChat[0].users)
            const userIds = isChat[0].users

            // fetching the user details
            // getUserDetailsByIds function 
            if (userIds) {
                try {
                    // fetch user details for the provided user ids

                    for (let i = 0; i < userIds.length; i++) {
                        const user = await getUserInfo(userIds[i]);
                        userDetails.push(user);
                    }
                    console.log("user Details :", userDetails)

                } catch (error) {
                    console.error("Error fetching user details: ", error)
                    throw error
                }

            }

            return res.status(200).json({ success: true, chat: isChat[0], users: userDetails })
        }

        // If chat does not exist, create a new chat
        if (isChat?.length === 0 && u_id !== undefined) {
            // Logic to create a new chat
            const users = [u_id, userId]
            const chatName = await db.select({ username: usersTable.username }).from(usersTable).where(eq(usersTable.id, userId))
            console.log("chatname: ", chatName)
            const newChat = await db.insert(chat).values(
                {
                    chatName: chatName[0].username,
                    isGroupChat: false,
                    groupAdmin: parseInt(u_id, 10), // Parse u_id to a number
                    users: users,

                }).returning();
            console.log("new chat: ", newChat)

            // fetching user details for the new chat
            const userIds = users
            if (userIds) {
                let userDetails = []
                for (let i = 0; i < userIds.length; i++) {
                    const user = await getUserInfo(userIds[i])
                    userDetails.push(user)
                }
                console.log("user details of the new chat: ", userDetails)
                return res.status(201).json({ chat: newChat, users: userDetails });


            } else {
                return res.status(404).json({ message: "userIds are null" });
            }




            // return res.status(201).json({ chat: newChat, users: userDetails });
        } else {
            return res.status(404).json({ message: "groupAdmin  undefined" });
        }



    } catch (error: any) {
        res.status(500).json({ message: "Error creating chat", error: error.message });
    }
}

// getting  all the chats linked with the user -> route: /fetchChat
async function FetchChats(req: express.Request, res: express.Response) {
    const userId = req.user?.id
    try {

        const chats = await fetchChat(userId)
        console.log("chats: ", chats)
        res.status(200).json({ chat: chats })
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
        res.status(400).send("please enter valid user")


        // var users = JSON.parse(req.body.users)
        if (users.length < 2) {
            res.status(400).send("more than 2 users are required to form a group")

        }
        users.push(parseInt(req.user?.id ?? ''))

        console.log("req.body.chatName: ", req.body.chatName)

        try {
            //creating group chat with chatName, users,isGroupChat - true, groupAdmin- req.user
            const groupChat = await db.insert(chat).values({
                chatName: req.body.chatName,
                users: users,
                isGroupChat: true,
                groupAdmin: parseInt(req.user?.id ?? '')
            }).returning({
                id: chat.id
            });
            console.log("groupchat: ", groupChat)
            res.status(200).json({ chat: groupChat })

        } catch (error: unknown) {
            console.error("Error creating group chat:  ", error)
            res.status(500).json({ message: "Error creating a group" });
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



router.post("/createChat", fetchuser, CreateChat)
router.get("/fetchChats", fetchuser, FetchChats)
router.post("/createGroupChat", fetchuser, CreateGroupChat)
router.put("/renameGroup", fetchuser, RenameGroup)

export default router