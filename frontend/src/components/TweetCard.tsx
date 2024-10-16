
import React, { useContext, useEffect, useState } from 'react'
import { BsCursorFill } from "react-icons/bs";
import { BsFillChatFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TweetContext } from '@/context/TweetState';
const tools = [
    {
        "id": 1,
        "element": <BsHeartFill />,
        "heading": "like"
    },
    {
        "id": 2,
        "element": <BsCursorFill />,
        "heading": "share"
    },
    {
        "id": 3,
        "element": <BsFillChatFill />,
        "heading": "comment"
    },
    {
        "id": 4,
        "element": "more",
        "heading": "more content"
    },

]



function Tooltips() {
    return (
        <div className="flex flex-col gap-4 justify-center my-auto ">
            {tools.map((ele) => (
                <TooltipProvider key={ele.id}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {/* <Button variant="outline" className='text-sm'>{ele.element}</Button> */}
                            <div className='cursor-pointer'>{ele.element}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{ele.heading}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );
}


interface Item {
    id: number; // or string, depending on your API
    content: string,
    userId: number,
    num_likes: number
    // Add other properties as needed
}

import { LoaderContext } from "@/context/LoaderState"
import Image from 'next/image';

const TweetCard = () => {

    const tweet_context = useContext(TweetContext)
    const { getTweets, getAllTweets } = tweet_context
    const { isLoading, setIsLoading } = useContext(LoaderContext)
    console.log("get tweets: ", getTweets)
    // handling api calls: 
    useEffect(() => {
        setIsLoading(prev => !prev)
        getAllTweets()
        setIsLoading(prev => !prev)

    }, [])


    return (
        <>{
            isLoading ? <div>...isLoading</div> :
                <>
                    {getTweets && getTweets.map((ele) => {

                        const tweet_Date = new Date(ele.updatedAt);
                        console.log("url: ", ele.userInfo[0].media_url)
                        const formattedDate = tweet_Date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });
                        const formattedTime = tweet_Date.toLocaleTimeString("en-US")

                        return (
                            <div className='m-4  p-3  flex flex-row bg-blue-300 rounded-2xl shadow-lg shadow-blue-950 ' key={ele.id}>

                                {/* 1. Avatar
                2. the smaller main content
                    i. username, holder name data, groupname
                    ii. the main content , tweet
                    iii. all the buttons , symbols
        
            */}

                                <div className=''>
                                    {/* <h1 className='w-fit p-2 bg-black text-white rounded-full'>{ele.media_url}</h1> */}

                                </div>
                                <div className='w-full '>
                                    <div className="flex flex-row justify-around w-full">
                                        <div className='flex flex-col border-r-2 border-b-black text-sm m-2 p-3 gap-4 w-4/5'>
                                            <div className="flex  flex-col">
                                                <div className='flex flex-row items-center gap-4'>
                                                    <Image src={ele.userInfo[0].media_url} width={50} height={50} alt='avatar' className='rounded-full' />

                                                    <div className='flex flex-col gap-2'>
                                                        <h1>{ele.userInfo[0].username}</h1>
                                                        <div className='flex flex-row'>
                                                            <h1>{formattedTime}</h1>
                                                            <h1>{formattedDate}</h1>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>


                                            <div className='bg-gray-500 m-2 p-4 rounded-3xl'>{ele.content}</div>

                                        </div>

                                        <div className='w-1/5 flex items-center'>

                                            <Tooltips />


                                        </div>
                                    </div>



                                </div>


                            </div>
                        )
                    })} </>

        }


        </>


    )
}

export default TweetCard
