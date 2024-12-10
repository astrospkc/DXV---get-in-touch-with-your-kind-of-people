"use client";
import React, { useContext, useState } from 'react';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';

import { TweetContext } from '@/context/TweetState';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CreditCard } from 'lucide-react';



const GroupsLeftBar = () => {
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);

    const createTweet_context = useContext(TweetContext);
    const { generateTweet } = createTweet_context;
    const [tweet, setTweet] = useState({
        content: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log("tweet handle submit: ", tweet);
        console.log("clicking the post");
        try {
            await generateTweet(tweet);
            alert("Tweet created successfully");
            router.push("/dashboard");
        } catch (error) {
            console.log("Not able to create tweet: ", error);
            alert("Some error occurred, please post your tweet again");
            return;
        }

        setIsClicked(false); // Close the dialog after submission
    };

    const handleChange = (e) => {
        setTweet({ ...tweet, [e.target.name]: e.target.value });
    };

    return (
        <div className='m-3 mx-6 flex flex-col justify-around items-center h-full text-gray-400'>
            <div className='flex flex-col w-fit'>

                <Link href="/groupsDashboard/chatPage" >
                    <Badge className='my-3 bg-slate-500 text-white p-2 hover:cursor-pointer hover:scale-125'>
                        Chats
                    </Badge>
                </Link>
                <Link href="/groupsDashboard/projectPage" >
                    <Badge className='my-3 bg-slate-500 text-white p-2 hover:cursor-pointer hover:scale-125'>
                        Project Material
                    </Badge>
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">More</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span className='hover:cursor-pointer'>Create video call</span>

                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span className='hover:cursor-pointer'><Link href="/groupsDashboard/sketchBoard">Open Whiteboard</Link></span>

                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/dashboard">
                    <Button variant="outline" className='my-4'>Dashboard</Button>
                </Link>
            </div>

        </div>
    );
}

export default GroupsLeftBar;



