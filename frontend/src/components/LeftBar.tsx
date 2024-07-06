import React from 'react'
import { Badge } from './ui/badge'
import Link from 'next/link'

const tags = [
    {
        "id": 1,
        "tag": "Home",
        "link": "/dashboard"
    },
    {
        "id": 2,
        "tag": "Create Group",
        "link": "/dashboard/createGroup"
    },
    {
        "id": 3,
        "tag": "Groups",
        "link": "/dashboard/groups"
    },
    {
        "id": 4,
        "tag": "Tweets",
        "link": "/dashboard/tweets"
    },
    {
        "id": 5,
        "tag": "Profile",
        "link": "/dashboard/profile"
    },
    {
        "id": 6,
        "tag": "About",
        "link": "/dashboard/about"
    },

]

const LeftBar = () => {
    return (
        <div className='m-3 mx-6  flex flex-col justify-around h-full text-gray-400'>
            <div className='flex flex-col w-fit'>
                {
                    tags && tags.map((tag) =>
                        <Link href={tag.link} key={tag.id} >
                            <Badge className='my-3 bg-slate-500 hover:text-sm hover:cursor-pointer' >
                                {tag.tag}


                            </Badge></Link>)

                }
            </div>


            <div className='flex flex-row text-sm justify-items-center border-2 rounded-full'>
                <div className='w-fit  p-4 bg-black  rounded-full' >Avatar</div>
                <div className='mx-2'>
                    <h1>Holder Name</h1>
                    <h1>@GroupName</h1>


                </div>
            </div>

        </div>
    )
}

export default LeftBar


{/* < Badge className = 'my-3 bg-slate-500 hover:text-sm hover:cursor-pointer' > Home</ >
                <Badge className='my-3 bg-slate-500 hover:text-sm hover:cursor-pointer'>Create Group</Badge>
                <Badge className='my-3 bg-slate-500 hover:text-sm hover:cursor-pointer'>Groups</Badge>
                <Badge className='my-3 bg-slate-500 hover:text-sm hover:cursor-pointer'>Tweets</Badge>
                <Badge className='my-3 bg-slate-500 hover:text-sm hover:cursor-pointer'>Profile</Badge>
                <Badge className='my-3 bg-slate-500 hover:text-sm hover:cursor-pointer'>About</Badge> */}
