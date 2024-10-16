
// import React from 'react'
"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useEffect } from "react"
import { GroupContext } from "@/context/GroupState"
import { UserContext } from "@/context/UserState"
import Image from "next/image"


const ProfileInfo = () => {
    const { groupInfo } = useContext(GroupContext)
    const { user, setUser } = useContext(UserContext)
    console.log("groupInfo in profile", groupInfo)

    const fetchUserDetails = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user_info`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("response,", response)

            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            const userDetails = await response.json();
            console.log('User details: ', userDetails);
            setUser(userDetails);
        } catch (error) {
            throw new Error("failed to fetch user details")
        }


    };
    useEffect(() => {
        fetchUserDetails()
    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Profile
                    </DialogDescription>
                </DialogHeader>


                {
                    groupInfo && user ? (
                        <div className="grid gap-4 py-4 text-white">

                            <div>{groupInfo.group_name}</div>
                            <div>{groupInfo.project_desc}</div>
                            {groupInfo.usersInfo && groupInfo.usersInfo.map((user) => (
                                <div key={user.id} className="flex flex-col border-b-2 border-gray-800">
                                    <div> {user.name}</div>
                                    <div> {user.email}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !groupInfo && user && (
                            <div className="flex flex-row gap-3 items-center">

                                <Image src={user[0].media_url} alt="profile" width={100} height={100} className="rounded-full" />
                                <div>
                                    <div className="fira-sans-medium "><span className="font-bold fira-sans-extrabold ">Username</span>: {user[0].name}</div>
                                    <div className="fira-sans-medium "><span className="font-bold fira-sans-extrabold  ">Email</span>: {user[0].email}</div>
                                </div>

                            </div>
                        )
                    )
                }
                {/* group details -> group name, group desc, group members  */}


                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileInfo

