import { usersTable } from './../db/schema/index';
import express from 'express'
import { checkUser, createUser, getallUsers, getUserInfoWithId } from '../db/queries/userQueries'
import { db } from '../db/db';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fetchuser from '../../middleware/fetchuser';
import { and, eq, like, not, or } from 'drizzle-orm';
import { emitWarning } from 'process';
import { upload } from '../middleware/multer.middleware';
import uploadOnCLoudinary from '../utils/cloudinary';
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

// for testing purpose

export function test(req: express.Request, res: express.Response) {
    res.send("test route")
}

async function createUserInfo(req: express.Request, res: express.Response) {
    try {

        let success = false
        console.log(req.body)
        const { name, username, email, password } = req.body;
        let imageFilePath;
        if (req.files && 'media_url' in req.files) {
            imageFilePath = req.files?.media_url[0]?.path
        }
        console.log("req.files: ", req.files)

        // if (!imageFilePath) {
        //     return res.status(400).json({ error: "Please upload an image" })
        // }

        const image = await uploadOnCLoudinary(imageFilePath)
        console.log("image: ", image?.url)

        if (!name || !username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = bcrypt.hashSync(password, salt)

        const user = await createUser(
            {

                name: name,
                username: username,
                email: email,
                password: secPass,
                media_url: image?.url
            }


        );
        console.log("user:", user)

        const data = {
            user: {
                id: user[0].id
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


        const passwordChecker = bcrypt.compareSync(password, userExist[0].password)
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
    const id = parseInt(req.user?.id ?? '');
    const data = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1).execute()
    res.send(data)
})

// responsible for providing userinfo when id is provided
async function getUser(req: express.Request, res: express.Response) {
    try {
        const userId = parseInt(req.user?.id ?? '')

        console.log("id: ", userId)
        const user = await getUserInfoWithId(userId);
        console.log("user", user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user information' });
    }
}

// get user info with id
async function getUserInfoId(req: express.Request, res: express.Response) {
    try {
        const id = parseInt(req.params.id)
        const user = await getUserInfoWithId(id)

        res.status(200).json(user)
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


// search for the user
async function searchUser(req: express.Request, res: express.Response) {
    // db.select().from(table).where(ne(table.column, 5));
    // db.select().from(table).where(not(eq(table.column, 5)));
    console.log("user id: type", typeof usersTable.id, " type of req.user", typeof req.user?.id)
    try {
        const keyword = req.query.search || " "
        const searchCondition = keyword ? {
            or: [
                { name: { like: `%${keyword}%` } },
                { email: { like: `%${keyword}%` } }
            ]
        } : undefined
        console.log("keyword: ", keyword, "search condition: ", searchCondition)



        const usersList = await db
            .select()
            .from(usersTable)
            .where(and(not(eq(usersTable.id, parseInt(req.user?.id ?? ""))), or(like(usersTable.name, `%${keyword}%`), like(usersTable.email, `%${keyword}%`))))
            .execute();

        res.status(200).json(usersList)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users information' });
    }
}
// user info
// fetch user with ids

router.get("/test", test)
router.post('/login', loginUser)
router.get('/users', getAllUsers)
router.get('/user_info', fetchuser, getUser);
router.route("/signup").post(upload.fields([{ name: "media_url", maxCount: 1 }]), createUserInfo)

router.get("/", fetchuser, searchUser)
router.get("/getUserInfoId/:id", fetchuser, getUserInfoId)

export default router
