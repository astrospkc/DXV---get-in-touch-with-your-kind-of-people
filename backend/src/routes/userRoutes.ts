import { usersTable } from './../db/schema';
import express from 'express'

import { body, validationResult } from "express-validator";
import { checkUser, createUser, getallUsers, getUserInfo } from '../db/queries/userQueries'
import { db } from '../db/db';

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { check } from 'drizzle-orm/mysql-core';
import fetchuser from '../../middleware/fetchuser';
import { eq } from 'drizzle-orm';
const router = express.Router()

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string; // Adjust the type based on your actual user object structure
                // Add other properties as needed
            };
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRETT

async function createUserInfo(req: express.Request, res: express.Response) {
    try {

        let success = false
        console.log(req.body)
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hashSync(password, salt)

        const user = await createUser(
            {

                name: name,
                username: username,
                email: email,
                password: secPass
            }


        );
        console.log("user:", user)

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET || "")
        success = true
        console.log("success: ", success, "token: ", authtoken)
        res.json({ success, user, authtoken });


    } catch (error) {
        res.status(500).json("Internal server error")
    }

}

async function loginUser(req: express.Request, res: express.Response) {
    try {
        let success = false
        const { username, password } = req.body
        const userExist = await checkUser(username)
        console.log(userExist)
        if (!userExist) {
            success = false
            return res.status(400).json({ success, error: "Please provide valid credentials 1" })
        }


        const passwordChecker = await bcrypt.compareSync(password, userExist[0].password)
        console.log("login password checker: ", passwordChecker)

        if (!passwordChecker) {
            success = false
            return res.status(400).json({ success, error: "Please provide valid credentials" })
        }


        const data = {
            user: {
                id: userExist[0].id
            }
        }
        console.log("login data: ", data)

        const authtoken = jwt.sign(data, JWT_SECRET || "")
        success = true
        console.log("authtoken: ", authtoken)
        res.json({ success, authtoken })

    } catch (error) {
        res.status(500).json("Internal server error")

    }
}

router.get("/getUserInfo_Token", fetchuser, async (req: express.Request, res: express.Response) => {
    console.log("user id ", req.user)
    const id = req.user?.id;
    const data = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1).execute()
    res.send(data)
})

async function getUser(req: express.Request, res: express.Response) {
    try {
        const userId = req.user?.id

        console.log("id: ", userId)
        const user = await getUserInfo(userId);
        console.log("user", user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user information' });
    }
}


async function getAllUsers(req: express.Request, res: express.Response) {
    try {
        const users = await getallUsers()
        console.log("users: ", users)
        if (!users) {
            return res.status(404).json({ error: 'user section is empty' })
        }
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users information' });
    }
}


router.post('/login', loginUser)
router.get('/users', getAllUsers)
router.get('/user_info', fetchuser, getUser);
router.post("/signup", createUserInfo);

export default router
