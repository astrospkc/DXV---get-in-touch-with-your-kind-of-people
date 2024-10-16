"use client"

import { createContext, useContext, useState } from "react";

// import { ChatProviderProps, ChatContextType, chatType, UserType } from "../components/types/types"


const ChatContext = createContext(undefined)

const ChatProvider = ({ children }) => {



    const [selectedChat, setSelectedChat] = useState({
        id: "",
        chatName: "",
        isGroupChat: false,
        users: [],
        latestMessage: null,
        groupAdmin: {
            id: "",
            name: "",
            username: "",
            email: "",
            pic: ""
        }

    });

    // const [selectedChat, setSelectedChat] = useState<chatType | "">("")
    const [user, setUser] = useState(undefined);
    // const [user_details, setUserDetails] = useState()
    // const [notification, setNotification] = useState<notificationType>({});
    const [chats, setChats] = useState([]);



    const userInfo = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert('first login please, token is not generated')

        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user_info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()

        ////console.log"userInfo: ", data)
        setUser(data)
    }

    console.log("user: ", user)


    // const userInfoWithId = async (id) => {
    //     console.log("id: ", id)
    //     const token = localStorage.getItem("token")
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getUserInfoId/${id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'application/json',
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //     const data = await res.json()
    //     setUserDetails(data)
    // }





    return (
        <ChatContext.Provider value={{
            user,
            setUser,
            selectedChat,
            setSelectedChat,

            // notification, setNotification,
            chats, setChats, userInfo

        }}>
            {children}
        </ChatContext.Provider>
    )
}

const ChatState = () => {
    const context = useContext(ChatContext)
    // if (context === undefined) {
    //     throw new Error("useChat must be used within a chatProvider")
    // }
    return context
}
export { ChatProvider, ChatState } 