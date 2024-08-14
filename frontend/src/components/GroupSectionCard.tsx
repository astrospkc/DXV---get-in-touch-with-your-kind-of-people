import React from 'react'

const GroupSectionCard = () => {
    return (


        <div className='flex flex-row text-sm justify-items-center border-2 rounded-2xl hover:bg-gradient-to-r from-indigo-950 to-red-500 p-2 hover:cursor-pointer'>
            <div className='w-fit  p-4 bg-black  rounded-full border-2 ' >Avatar</div>
            <div className='mx-2 hover:text-black'>
                <h1>Holder Name</h1>
                <h1>@GroupName</h1>
            </div>

        </div>
    )
}

export default GroupSectionCard
