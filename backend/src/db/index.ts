import { usersTable } from './schema/users';
import express from "express";
import userRouter from "../routes/userRoutes"
import tweetRouter from "../routes/tweetRoutes"
import postRouter from "../routes/postRoutes"
import groupRouter from "../routes/groupRoutes"
import groupMemberRouter from "../routes/groupMemberRoute"
import chatRouter from "../routes/chat"
import messageRouter from "../routes/message"
import connectionRouter from "../routes/connection"

import projectRouter from "../routes/projectFile"
import { Server } from "socket.io";
import cors from 'cors';


const allowedOrigins = "http://localhost:3000"

const PORT = 7000
const app = express();

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
)

app.use(express.json())
app.use(cors())
// route:1 -> create user
app.use("/api", userRouter)
// routes:2 --> create tweet
app.use("/tweet", tweetRouter)
// routes:3 --> create post
app.use("/post", postRouter)
// routes:4 --> create a group
app.use("/group", groupRouter)
// routes:5 --> create group members
app.use("/group_member", groupMemberRouter)
// route:6 --> chat
app.use("/chat", chatRouter)
//route:7 --> message
app.use("/message", messageRouter)

// router-8 -->connection
app.use("/connection", connectionRouter)

// router-9 --> project
app.use("/project", projectRouter)


app.get("/", async (req, res) => {
    res.send("hi homepage ")
    console.log("this is homepage")
})
// const server = app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// new instance of socket.io by passing the server object. listen on the connection event for incoming sockets
// const io = new Server(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: allowedOrigins,
//         credentials: true
//     }
// })

// Socket.io connection logic ... 
// io.on("connection", (socket) => {
//     console.log("connected to socket.io")
//     let userdata: any;
//     socket.on("setup", (data) => {
//         userdata = data
//         console.log("userdata: ", userdata)
//         if (userdata) {
//             socket.join(userdata._id)
//         }
//         socket.emit("connected")
//     })
//     socket.on("join chat", (room) => {
//         socket.join(room);
//         console.log("user connected room ", room)
//     })
//     // when the sender is typing , it will show on the screen
//     socket.on("typing", (room) => socket.in(room).emit("typing"))
//     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

//     socket.on("new message", (newMessageRecieved) => {
//         var chat = newMessageRecieved.chat;
//         if (!chat.usersTable) {
//             return "chat.usersTable is not defined"
//         }

//         chat.usersTable.forEach((user: any) => {
//             if (user.id === newMessageRecieved.sender.id) return
//             socket.in(user.id).emit("message recieved", newMessageRecieved)
//         })
//     })

//     socket.off("setup", () => {
//         console.log("user disconnected")
//         socket.leave(userdata.id)
//     })


// })
