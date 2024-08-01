import express from 'express'

import { body, validationResult } from "express-validator";
import { createUser, getUserInfo } from '../db/queries/userQueries'
import { db } from '../db/db';

// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
const router = express.Router()

// const JWT_SECRET = "secret"

async function createUserInfo(req: express.Request, res: express.Response) {
    console.log(req.body)
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }
    const users = await createUser(
        {

            name: name,
            username: username,
            email: email,
            password: password
        }


    );
    console.log("users:", users)


    res.json(users);
}

async function getUser(req: express.Request, res: express.Response) {
    try {
        const userId = parseInt(req.params.userid)

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
router.get('/users/:userid', getUser);


router.post("/insertUsers", createUserInfo);

export default router
