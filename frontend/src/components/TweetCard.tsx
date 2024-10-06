
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
        "element": "...",
        "heading": "more content"
    },

]



function Tooltips() {
    return (
        <div className="flex gap-4 justify-evenly">
            {tools.map((ele) => (
                <TooltipProvider key={ele.id}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline">{ele.element}</Button>
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

const TweetCard = () => {
    const [data, setData] = useState<Item[]>([])
    const tweet_context = useContext(TweetContext)
    const { getTweets, setGetTweets, getAllTweets } = tweet_context
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
                        return (
                            <div className='m-4  p-3  flex flex-row bg-black rounded-2xl ' key={ele.id}>

                                {/* 1. Avatar
                2. the smaller main content
                    i. username, holder name data, groupname
                    ii. the main content , tweet
                    iii. all the buttons , symbols
        
            */}

                                <div className=''>
                                    <h1 className='w-fit p-2 bg-black text-white rounded-full'>Avatar</h1>
                                </div>
                                <div className='w-full'>
                                    <div className='flex flex-row border-b-2 border-b-black text-sm m-2 p-3 gap-4'>
                                        <div className='flex flex-col'><h1>Holder name</h1>
                                            <h1>@Username</h1></div>
                                        <div className='flex flex-row gap-4'>
                                            <h1>--group name</h1>
                                            <h1>date</h1>
                                        </div>

                                    </div>
                                    <div className='bg-black m-2 p-4 rounded-3xl'>{ele.content}</div>

                                    <div>

                                        <Tooltips />


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
