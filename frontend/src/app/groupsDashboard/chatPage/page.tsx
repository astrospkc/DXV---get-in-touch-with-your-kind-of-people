
"use client"
import SearchDrawer from '@/components/miscellaneous/SearchDrawer'
import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChatState } from '@/context/ChatState'
import { Dialog } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react'

import ChatBox from '@/components/chat/ChatBox'
import { GroupContext } from '@/context/GroupState'



const ChatPage = () => {

    const { selectedChat, setSelectedChat, userInfo, user } = ChatState()

    const { groupInfo } = useContext(GroupContext)
    // console.log("groupinfo in chatpage", groupInfo)

    const chatName = groupInfo.group_name
    const chatDetails = async () => {
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/chat/fetchChatDetails/${chatName}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            // console.log("data in chat details: ", data)
            setSelectedChat(data)

        } catch (error) {
            console.error("Error fetching chat details:", error);
        }
    }

    useEffect(() => {
        chatDetails()
    }, [])

    const [fetchAgain, setFetchAgain] = useState(false)
    // useEffect(() => {
    //     userInfo()
    // }, [])
    console.log("selected chat: ", selectedChat)



    return (
        <div className='flex flex-col h-full w-full text-white'>
            {/* this is chat page */}
            {/* the header , contains  search bar and menu */}
            {/* the chat box , contains the chat + one sidebar where all the chats are showing */}
            {/* for header */}
            {/* <div className='flex flex-row justify-between bg-black text-white p-3'> */}
            {/* <div className="hover:cursor-pointer rounded-3xl ">
                    <SearchDrawer />
                </div> */}

            {/* </div> */}
            {/* for chat box , inside it 2 boxes arranged in rows */}
            <div className='bg-gray-900 flex flex-row  h-full'>

                {/* <div className={`${selectedChat && selectedChat[0].id != "" ? 'hidden' : 'block'} md:flex  w-full md:w-1/4 p-4 shadow-lg shadow-black`}> */}
                {/* <MyChats fetchAgain={fetchAgain} /> */}
                {/* </div> */}

                {/* <div className={`${selectedChat && selectedChat._id != "" ? "block" : "hidden"} md:${selectedChat && "block"} w-full h-full`}> */}
                <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </div>
            {/* </div> */}

        </div>
    )
}

export default ChatPage




