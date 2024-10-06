import React from 'react'
import { IoMdClose } from "react-icons/io";
const UserBadge = ({ user, handleFn }: any) => {
    return (
        <div key={user.id} className='flex flex-row text-center bg-cyan-400 p-2 w-fit rounded-3xl gap-2 items-center my-2' onClick={handleFn}>
            <div>{user.name}</div>
            <IoMdClose className='hover:cursor-pointer' />
        </div>
    )
}

export default UserBadge
