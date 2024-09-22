import { usersTable } from './../db/schema';

import { and, arrayContains } from 'drizzle-orm';
import express from 'express'
import { db } from '../db/db'

import fetchuser from '../../middleware/fetchuser';

import { eq } from 'drizzle-orm';

import { createChat } from '../db/queries/chatQueries';
import { error } from 'console';
import { getUserInfo } from '../db/queries/userQueries';

// import { body, validationResult } from "express-validator";

const router = express.Router()

async function CreateChat(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userId } = req.body;

    const u_id = req.user?.id; // Assuming req.user is an object with an id property
    console.log("sender_id: ", userId, "and receiver_id: ", u_id)
    try {
        // Checking if the chat already exists
        console.log("checking the chat already exists or not")


        // this is the trial section - >
        const isChat = await db.query.chat.findMany({
            where: (users) => {

                return and(eq(users.isGroupChat, false),
                    arrayContains(users.users, [u_id, userId]))
            },


        })


        console.log("checking the chat already exists or not")

        console.log("is chat: ", isChat)



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
            const newChat = await createChat(
                {
                    chatName: req.body.chatName,
                    isGroupChat: false,
                    groupAdmin: parseInt(u_id, 10), // Parse u_id to a number
                    users: [u_id, userId],

                });
            console.log("new chat: ", newChat)

            // fetching user details for the new chat
            const userIds = newChat.users
            if (userIds) {
                let userDetails = []
                for (let i = 0; i < userIds.length; i++) {
                    const user = await getUserInfo(userIds[i])
                    userDetails.push(user)
                }
                console.log("user details of the new chat: ", userDetails)

            } else {
                return res.status(404).json({ message: "userIds are null" });
            }




            return res.status(201).json({ chat: newChat, users: userDetails });
        } else {
            return res.status(404).json({ message: "groupAdmin  undefined" });
        }



    } catch (error: any) {
        res.status(500).json({ message: "Error creating chat", error: error.message });
    }
}


router.post("/createChat", fetchuser, CreateChat)

export default router