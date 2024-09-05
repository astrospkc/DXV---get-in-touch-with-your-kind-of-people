import React, { useContext, useEffect, useState } from 'react';
import { GroupContext } from '@/context/GroupState';

const GroupSectionCard = () => {
    const { fetchGroups, allGroups, userId_Username } = useContext(GroupContext);
    const [userNames, setUserNames] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        const fetchUserNames = async () => {
            const userNameMap: { [key: number]: string } = {};
            for (const group of allGroups) {
                const userName = await userId_Username(group.groupAdminId);
                console.log("username: ", userName)
                userNameMap[group.groupAdminId] = userName;
            }
            setUserNames(userNameMap);
        };
        fetchUserNames();
    }, []);

    console.log("all groups", allGroups)
    console.log("name ", userNames)

    return (
        <>
            {allGroups.map((ele) => (
                <div
                    key={ele.group_id}
                    className='flex flex-row text-sm justify-items-center border-2 rounded-2xl hover:bg-gradient-to-r from-indigo-950 to-red-500 p-2 hover:cursor-pointer my-3'
                >
                    <div className='w-fit p-4 bg-black rounded-full border-2'>Avatar</div>
                    <div className='mx-2 hover:text-black'>
                        <h1>{userNames[ele.groupAdminId] || 'Holder Name'}</h1>
                        <h1 className='text-sm'>
                            <span>@{ele.group_name}</span>
                        </h1>
                    </div>
                </div>
            ))}
        </>
    );
};

export default GroupSectionCard;