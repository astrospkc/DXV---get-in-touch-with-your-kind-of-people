"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { GroupContext } from "@/context/GroupState";
import { UserContext } from '@/context/UserState';

const CreateGroupForm = () => {
    // const [user, setUser] = useState({});
    const [load_context , setLoadContext] = useState(loader_context)
    const user_context = useContext(UserContext)
    const group_context = useContext(GroupContext);
    const { createGroup } = group_context;
    const [group, setGroup] = useState({
        group_name: "",
        group_adminId: "",
        total_members: "",
        group_media_url: "",
        github_url: "",
        project_desc: ""
    });

    const { fetchUserDetails, user, setUser } = user_context;


    useEffect(() => {
        fetchUserDetails();

    }, []);
    console.log("userdetails: ", user)
    let user_id = user[0]?.id;
    console.log('user_id: ', user_id)
    // if (user) {
    //     user_id = user[0].id;
    //     console.log("user_id: ", user_id)
    // }



    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log("group handle submit: ", group)
        createGroup(group); // Pass the entire group object
        // setGroup({
        //     group_name: "",
        //     group_adminId: user_id,
        //     total_members: "",
        //     group_media_url: "",
        //     github_url: "",
        //     project_desc: ""
        // });
    };

    const handleChange = (e) => {
        setGroup({ ...group, [e.target.name]: e.target.value });
    };

    console.log(group)

    return (
        <div className='flex flex-col p-10 justify-center items-center'>
            <h1 className='text-3xl my-4'>Create group</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='rounded-full'>
                    <label htmlFor="group_name" className='font-bold'>Group name</label>
                    <input id="group_name" name="group_name" type="text" placeholder='Group name' className='p-2 rounded-full ml-3' onChange={handleChange} />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="group_adminId" className='font-bold'>Group Admin Id</label>
                    <input id="group_adminId" name="group_adminId" type="number" placeholder={user_id} className='p-2 rounded-full ml-3' value={user_id} readOnly />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="total_members" className='font-bold'>Total Members</label>
                    <input id="total_members" name="total_members" type="text" placeholder='2' className='p-2 rounded-full ml-3' onChange={handleChange} />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="group_media_url" className='font-bold'>Profile Pic</label>
                    <input id="group_media_url" name="group_media_url" type="text" placeholder='URL to profile pic' className='p-2 rounded-full ml-3' onChange={handleChange} />
                </div>
                <div className='rounded-full'>
                    <label htmlFor="github_url" className='font-bold'>Github Url</label>
                    <input id="github_url" name="github_url" type="text" placeholder="https://github.com/astro/DXV" className='p-2 rounded-full ml-3' onChange={handleChange} />
                </div>
                <div className='rounded-full flex flex-col'>
                    <label htmlFor="project_desc" className='font-bold'>Description</label>
                    <textarea rows="5" cols="30" name='project_desc' placeholder='Description about the project' className='rounded p-3 focus:border-2 focus:border-gray-500' onChange={handleChange}></textarea>
                </div>
                <Button type="submit" className='w-fit justify-center my-4'>Submit</Button>
            </form>
        </div>
    );
};

export default CreateGroupForm;
