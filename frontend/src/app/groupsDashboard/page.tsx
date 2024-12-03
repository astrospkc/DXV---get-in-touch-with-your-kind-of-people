"use client"
import { GroupContext } from '@/context/GroupState'
import React, { useContext } from 'react'

const GroupsDashboard = () => {

    const { groupInfo } = useContext(GroupContext)
    console.log("groupInfo: ", groupInfo)
    return (
        <div className='flex flex-col justify-center m-auto bg-gray-900 items-center h-full w-full'>
            <div className='w-1/2 h-1/2 bg-gradient-to-r from-cyan-500 to-indigo-950 rounded-full relative  shadow-cyan-200 shadow-lg'>
                <div className="flex absolute w-fit h-fit top-20">
                    <div className='flex flex-col justify-center m-auto bg-gray-900 items-center w-fit text-orange-400  rounded-full shadow-lg shadow-black p-4'>
                        <h1 className='text-4xl font-bold my-4 text-center'>Welcome {groupInfo?.group_name} !</h1>
                        <p className='w-3/5 flex text-center text-yellow-400'>
                            SO what are you up to today?
                            get your work done.. lets make our ideas a reality , lets create healthy environment
                        </p>
                    </div>

                </div>
            </div>





        </div>
    )
}

export default GroupsDashboard

