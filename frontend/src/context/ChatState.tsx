"use client"

import { createContext, useContext, useState } from "react";

import { ChatProviderProps, ChatContextType, chatType, UserType } from "../components/types/types"


const ChatContext = createContext<ChatContextType | undefined>(undefined)

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {



    const [selectedChat, setSelectedChat] = useState<chatType>({
        _id: null,
        chatName: "",
        isGroupChat: false,
        users: [],
        latestMessage: null,
        groupAdmin: null
    });

    // const [selectedChat, setSelectedChat] = useState<chatType | "">("")
    const [user, setUser] = useState<UserType | undefined>(undefined);
    // const [notification, setNotification] = useState<notificationType>({});
    const [chats, setChats] = useState<chatType[]>([]);



    const userInfo = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert('first login please, token is not generated')

        }
        const res = await fetch(`http://localhost:7000/api/user_info`, {
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
    if (context === undefined) {
        throw new Error("useChat must be used within a chatProvider")
    }
    return context
}
export { ChatProvider, ChatState } 