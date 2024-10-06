import { Avatar } from '@chakra-ui/react'
// import { UserType } from "../components/types/types"

// interface UserListItemProps {
//     user: UserType;
//     handleFn: () => void
// }

const UserListItem = ({ user, handleFn }: any) => {
    return (
        <div onClick={handleFn} className='my-4 border-2 border-gray-300 p-2 bg-gray-700 shadow-xl shadow-black text-white hover:scale-105 hover:cursor-pointer hover:bg-gray-400 rounded-xl'>
            <div className='flex flex-row items-center gap-2'>
                <Avatar name={user.name} src={user.pic} height={8} width={8} />
                <div>{user.name}</div>
            </div>

            <div>Email: {user.email}</div>


        </div>
    )
}

export default UserListItem