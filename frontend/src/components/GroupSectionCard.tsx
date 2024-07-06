import React from 'react'

const GroupSectionCard = () => {
    return (
        <div className='flex flex-row text-sm justify-items-center border-2 rounded-full'>
            <div className='w-fit  p-4 bg-black  rounded-full' >Avatar</div>
            <div className='mx-2'>
                <h1>Holder Name</h1>
                <h1>@GroupName</h1>
            </div>

        </div>
    )
}

export default GroupSectionCard
