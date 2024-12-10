"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '@/context/UserState';
import { GroupContext } from '@/context/GroupState';

import AddMember from './addMember/page';
import { ChatState } from '@/context/ChatState';
import axios from 'axios';

const CreateGroupForm = () => {
    const [selectedUser, setSelectedUser] = useState<any>([])
    const [selectedUserIds, setSelectedUserIds] = useState<any>([])
    const { user } = useContext(UserContext)
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
    const { chats, setChats } = ChatState()
    const [file, setFile] = useState("")

    const [groupChat, setGroupChat] = useState({

        chatName: "",
        isGroupChat: false,
        users: [],
        users_info: [],
        latestMessage: null,
        group_admin: {
            id: "",
            name: "",
            username: "",
            email: "",
            pic: ""
        }
    })
    // console.log("user: ", user)
    let user_id;
    if (user) {
        user_id = user[0]?.id;
    }

    // console.log('user_id: ', user_id)

    // console.log("selected user ids, and selected users: ", selectedUserIds, selectedUser)
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
        // console.log("props: ", props);

        try {
            const token = localStorage.getItem("token");
            console.log("token", token);
            const formData = new FormData()
            formData.append("group_name", group_name)
            formData.append("groupAdminId", groupAdminId)
            formData.append("total_members", total_members)
            formData.append("group_media_url", file)
            formData.append("github_url", github_url)
            formData.append("project_desc", project_desc)
            formData.append("users", selectedUserIds)

            // update data in group table
            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/group/createGroup`, formData, {

                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },

            });

            if (!res.data.ok) {
                console.log("failed to create group");
            }
            const data = await res.data;
            // console.log("the group : ", data);
            setGroups((prevGroups) => prevGroups.concat(data));

            alert("group created successfully");

            // create group chat , update data in chattable
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/chat/createGroupChat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    chatName: group_name,

                    users: selectedUserIds,

                }),
            });
            if (!response.ok) {
                console.log("failed to create group chat");
            }

            // const chat_data = await response.json();
            // console.log("the group : ", chat_data);
            setChats((prevGroups) => prevGroups.concat(data));

            alert("group chat created successfully");


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
        setGroupChat({
            ...groupChat,
            chatName: group.group_name,

        })
    };
    console.log("selected user: ", selectedUser)

    console.log(group)
    // submitting the form , submitting chatname

    return (
        <div className='flex flex-col p-10 justify-center items-center '>
            <h1 className='text-3xl my-4'>Create group</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4  bg-transparent p-11 shadow-xl shadow-black rounded-xl '>
                <div className='rounded-full'>
                    <label htmlFor="group_name" className='font-bold'>Group name <span className='text-gray-600'>(unique)</span></label>
                    <input id="group_name" defaultValue={group.group_name} name="group_name" type="text" placeholder='Group name' className='p-2 rounded-full ml-3 text-white' onChange={handleChange} />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="group_adminId" className='font-bold'>Group Admin Id</label>
                    <input id="group_adminId" defaultValue={group.group_adminId} name="group_adminId" type="number" placeholder={user_id} className='p-2 rounded-full ml-3 text-white' value={user_id} readOnly />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="total_members" className='font-bold'>Total Members</label>
                    <input id="total_members" defaultValue={group.total_members} name="total_members" type="text" placeholder='2' className='p-2 rounded-full ml-3 text-white' onChange={handleChange} />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="group_media_url" className='font-bold'>Profile Pic</label>
                    <input id="group_media_url" defaultValue={group.group_media_url} name="group_media_url" type="file" placeholder='URL to profile pic' className='p-2 rounded-full ml-3 text-white' onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="github_url" className='font-bold'>Github Url<span className='text-gray-600'>(unique)</span></label>
                    <input id="github_url" defaultValue={group.github_url} name="github_url" type="text" placeholder="https://github.com/astro/DXV" className='p-2 rounded-full ml-3 text-white' onChange={handleChange} />
                </div>
                <div className='rounded-full flex flex-col'>
                    <label htmlFor="project_desc" className='font-bold'>Description</label>
                    <textarea autoFocus rows="5" cols="30" name='project_desc' placeholder='Description about the project' className='rounded p-3 focus:border-2 focus:border-gray-500 text-white' onChange={handleChange}></textarea>
                </div>

                <AddMember group={group} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser} selectedUserIds={selectedUserIds} setSelectedUsedIds={setSelectedUserIds} />
                {/* <Link href="/dashboard/createGroup/addMember"> */}
                <Button type="submit" className='w-fit justify-center my-4'>Submit</Button>
                {/* </Link> */}

            </form>


        </div>
    );
};

export default CreateGroupForm;
