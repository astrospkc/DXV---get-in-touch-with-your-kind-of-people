import React, { useState } from 'react'
import SingleChat from './SingleChat'

const ChatBox = ({ fetchAgain, setFetchAgain }) => {

    // const [chats, setChats] = useState([])

    // const fetchAllchats = async () => {
    //     const res = await fetch("${process.env.NEXT_PUBLIC_URL}/chat/fetchChats")
    // }
    return (
        <div className='${selectedChat ? "block" : "hidden"} md:${selectedChat && "block"} w-full h-full'>
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
    )
}

export default ChatBox

