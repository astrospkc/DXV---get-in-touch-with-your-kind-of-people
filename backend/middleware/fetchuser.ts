
import dotenv from 'dotenv';

dotenv.config();
import jwt from 'jsonwebtoken'
import express from 'express'


const JWT_secret = process.env.JWT_SECRETT || "";

const fetchuser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //get the user from jwttoken and add id to req object

    console.log("headers:", req.headers);
    console.log(req.headers.authorization)

    // const token = req.headers.authtoken;
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
        res.status(401).send({ error: "Authenticate using a valid token initial" });
    }

    try {
        if (token === undefined) return res.status(401).send({ error: "Authenticate using a valid token" });
        const data = jwt.verify(token, JWT_secret);
        console.log("Data after jwt verification : \n", data.user);
        req.user = data.user;
        next();
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(401).send({ error: "Authenticate using a valid token" });
    }
};

export default fetchuser