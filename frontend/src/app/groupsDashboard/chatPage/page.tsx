
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
import { useEffect, useState } from 'react'
import MyChats from '../../../components/chat/MyChats'

// chat box .. which contains all the latest messages
// send message inbox
// icon - to know the details of the group member
const ChatPage = () => {

    const { selectedChat } = ChatState()
    const router = useRouter()

    const { user, userInfo } = ChatState()
    const [fetchagain, setFetchAgain] = useState<Boolean>(false)

    useEffect(() => {
        userInfo()
    }, [])
    console.log(user)
    console.log("name: ", user[0].name, "username: ", user[0].username)



    return (
        <div className='flex flex-col h-full w-full'>
            {/* the header , contains  search bar and menu */}
            {/* the chat box , contains the chat + one sidebar where all the chats are showing */}
            {/* for header */}
            <div className='flex flex-row justify-between bg-black text-white p-3'>
                <div className="hover:cursor-pointer rounded-3xl ">
                    <SearchDrawer />
                </div>
                <div className="hover:bg-gray-500 hover:cursor-pointer rounded-3xl ">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Menu</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Your group details
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <h1>Name</h1>
                                    <p>{user[0].name}</p>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <h1></h1>
                                    <p>{user[0].name}</p>
                                </div>
                            </div>
                            {/* <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter> */}
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
            {/* for chat box , inside it 2 boxes arranged in rows */}
            <div className='flex flex-row w-full h-full'>
                <div className='w-1/5 border-r-2 border-gray-800 '><MyChats /></div>
                <div className='w-4/5  flex flex-col h-full'>
                    <div className='flex-grow p-3'>the main content</div>
                    <div className='mt-auto py-3 mb-1 mx-4'>
                        <Input className='w-full bg-slate-950' placeholder='Text ....' />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ChatPage



