import React, { useContext, useEffect, useState } from 'react';
import { GroupContext } from '@/context/GroupState';
import Image from 'next/image';

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

    const handleClick = () => {
        console.log("handle clikc")
    }

    return (
        <>
            {allGroups && allGroups.map((ele) => (
                <div
                    onClick={handleClick}
                    key={ele.group_id}
                    className='flex flex-row text-sm justify-items-center shadow-lg shadow-black rounded-2xl  p-2 hover:cursor-pointer my-3'
                >
                    {/* <div className='w-fit p-4 bg-black rounded-full border-2'>Avatar</div> */}
                    <Image src={ele.group_media_url} width={20} height={20} className="rounded-full" alt={ele.group_name} />
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