"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '@/context/UserState';
import { GroupContext } from '@/context/GroupState';

import AddMember from './addMember/page';

const CreateGroupForm = () => {

    const user_context = useContext(UserContext)
    const [selectedUser, setSelectedUser] = useState<any>([])
    const [selectedUserIds, setSelectedUserIds] = useState<any>([])
    const { groups, setGroups }: any = useContext(GroupContext)
    const [group, setGroup] = useState({
        group_name: "",
        group_adminId: "",
        total_members: "",
        group_media_url: "",
        github_url: "",
        project_desc: "",
        users: []

    });
    const { fetchUserDetails, user, setUser } = user_context;


    useEffect(() => {
        fetchUserDetails();

    }, []);
    console.log("userdetails: ", user)
    let user_id = user[0]?.id;
    console.log('user_id: ', user_id)


    // creating a group -> details: group_name, group_adminId, total_members, media_url, github_url,project_desc
    const createGroup = async (props) => {
        console.log("props: ", props);
        const {
            group_name,
            groupAdminId,
            total_members,
            media_url,
            github_url,
            project_desc,
            users
        } = props;
        console.log("props: ", props);
        try {
            const token = localStorage.getItem("token");
            console.log("token", token);
            const res = await fetch(`http://localhost:7000/group/createGroup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    group_name: group_name,
                    groupAdminId: groupAdminId,
                    total_members: total_members,
                    media_url: media_url,
                    github_url: github_url,
                    project_desc: project_desc,
                    users: selectedUser
                }),
            });

            if (!res.ok) {
                console.log("failed to create group");
            }

            const data = await res.json();
            console.log("the group : ", data);
            setGroups((prevGroups) => prevGroups.concat(data));

            alert("group created successfully");
            // router.push("/dashboard/groups");
        } catch (error) {
            console.log(" lets see this error came: ", error);
        }
    };
    console.log("group that created now: ", groups)

    // creating a group -> submiting the group details
    // route used: /createGroup + /createGroupMember
    const handleSubmit = (e: any) => {
        e.preventDefault(); // Prevent default form submission
        console.log("group handle submit: ", group)
        createGroup(group); // Pass the entire group object

    };

    const handleChange = (e) => {
        setGroup({ ...group, [e.target.name]: e.target.value });
    };
    console.log("selected user: ", selectedUser)

    console.log(group)
    // submitting the form , submitting chatname

    return (
        <div className='flex flex-col p-10 justify-center items-center '>
            <h1 className='text-3xl my-4'>Create group</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4  bg-black p-11 shadow-xl shadow-black rounded-xl'>
                <div className='rounded-full'>
                    <label htmlFor="group_name" className='font-bold'>Group name <span className='text-gray-600'>(unique)</span></label>
                    <input id="group_name" value={group.group_name} name="group_name" type="text" placeholder='Group name' className='p-2 rounded-full ml-3' onChange={handleChange} />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="group_adminId" className='font-bold'>Group Admin Id</label>
                    <input id="group_adminId" value={group.group_adminId} name="group_adminId" type="number" placeholder={user_id} className='p-2 rounded-full ml-3' value={user_id} readOnly />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="total_members" className='font-bold'>Total Members</label>
                    <input id="total_members" value={group.total_members} name="total_members" type="text" placeholder='2' className='p-2 rounded-full ml-3' onChange={handleChange} />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="group_media_url" className='font-bold'>Profile Pic</label>
                    <input id="group_media_url" value={group.group_media_url} name="group_media_url" type="text" placeholder='URL to profile pic' className='p-2 rounded-full ml-3' onChange={handleChange} />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="github_url" className='font-bold'>Github Url<span className='text-gray-600'>(unique)</span></label>
                    <input id="github_url" value={group.github_url} name="github_url" type="text" placeholder="https://github.com/astro/DXV" className='p-2 rounded-full ml-3' onChange={handleChange} />
                </div>
                <div className='rounded-full flex flex-col'>
                    <label htmlFor="project_desc" className='font-bold'>Description</label>
                    <textarea autoFocus rows="5" cols="30" name='project_desc' placeholder='Description about the project' className='rounded p-3 focus:border-2 focus:border-gray-500' onChange={handleChange}></textarea>
                </div>

                <AddMember group={group} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                {/* <Link href="/dashboard/createGroup/addMember"> */}
                <Button type="submit" className='w-fit justify-center my-4'>Submit</Button>
                {/* </Link> */}

            </form>


        </div>
    );
};

export default CreateGroupForm;
