
import React from 'react'
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



function TooltipDemo() {
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



const TweetCard = () => {
    return (
        <div className='m-2  p-3 border-2 border-gray-700 flex flex-row bg-gray-800 rounded-2xl'>

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
                <div className='bg-black m-2 p-4 rounded-3xl'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi aliquid minima amet, soluta laborum, praesentium repudiandae maxime ab, quam unde provident. Id asperiores, ullam nobis quia debitis tempora ipsam expedita, voluptates delectus magni nostrum error deserunt enim consequuntur, perferendis repellat! Commodi accusamus voluptates fuga libero quasi quidem eos provident laborum?</div>
                {/* <div>
                    <ul className='flex flex-row justify-evenly'><li><BsHeartFill /></li>
                        <li><BsFillChatFill /></li>
                        <li><BsCursorFill /></li>
                        <li>...</li></ul>

                </div> */}
                <div>

                    <TooltipDemo />


                </div>
            </div>


        </div>
    )
}

export default TweetCard
