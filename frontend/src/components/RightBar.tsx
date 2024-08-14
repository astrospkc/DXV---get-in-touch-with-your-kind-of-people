import React from 'react'
import GroupSectionCard from './GroupSectionCard'

const RightBar = () => {
    return (
        <div className=' flex flex-col mt-24 h-full items-center text-gray-400'>
            <div className='text-xl font-bold '>Find Group</div>

            <div className='m-2'><GroupSectionCard /></div>


        </div>
    )
}

export default RightBar
