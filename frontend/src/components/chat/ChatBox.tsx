import React, { useState } from 'react'

const ChatBox = () => {

    const [chats, setChats] = useState([])

    const fetchAllchats = async () => {
        const res = await fetch("http://localhost:7000/chat/fetchChats")
    }
    return (
        <div>
            this is the chatbox
        </div>
    )
}

export default ChatBox

