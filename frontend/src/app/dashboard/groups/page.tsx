"use client"
import React, { useContext, useEffect } from "react";
import { GroupContext } from "@/context/GroupState";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { group } from "console";
import axios from "axios";
import { Rss } from "lucide-react";


export default function Groups() {
    const router = useRouter()
    const group_context = useContext(GroupContext);

    if (!group_context) {
        throw new Error("CardWithForm must be used within a GroupProvider");
    }
    const { usergroup, setUserGroup, fetchCreatedGroups, groups, groupInfo, setGroupInfo } = group_context;


    useEffect(() => {
        fetchCreatedGroups()
    }, [])
    console.log("user group: ", usergroup);


    // this will handle the opened group details also

    const handleOpen = (grp_name: string) => {
        let data;
        console.log("group name: ", grp_name)
        console.log("groups: ", usergroup)

        if (groups) {
            for (let group of usergroup) {
                // console.log(group)

                if (group?.group_name === grp_name) {
                    console.log("group name: ", group.group_name, "group info: ", group)
                    data = group

                    //{group_id: 2, group_name: 'asthe_tic', groupAdminId: 26, total_members: 3, group_media_url: null, …}
                    break;

                }

            }
            // console.log("data: ", data)
            handleGroupData(data)
        }


        router.push("/groupsDashboard")
    }


    const handleGroupData = (info) => {
        console.log("info: ", info)
        setGroupInfo(info)
    }

    useEffect(() => {
        handleGroupData
    }, [])

    console.log("group info", groupInfo)
    return (
        <>
            <div className="flex flex-row justify-center items-center m-auto my-10 ">
                <div className=" flex-1 text-center border-r-2 border-gray-700 p-3  "><span className="bg-yellow-500 font-bold hover:text-white p-2 rounded-3xl hover:bg-gray-900 hover:scale-100 hover:cursor-pointer">Groups Created</span></div>
                <div className="flex-1 text-center  border-gray-700 p-3 "><span className="bg-yellow-500 p-2 font-bold hover:text-white rounded-3xl hover:bg-black hover:scale-100 hover:cursor-pointer">Groups Joined</span></div>
            </div>
            <div className="justify-center grid grid-cols-1 md:grid-cols-2 gap-4 m-3">
                {usergroup && usergroup?.map((group) => {
                    return (

                        <div key={group.group_id}>
                            <Card className="w-[350px] shadow-black shadow-xl  hover:scale-95 hover:bg-gradient-to-r from-black to-slate-600">
                                <CardHeader>
                                    <CardTitle>{group.group_name}</CardTitle>
                                    <CardDescription>{group.group_desc}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <div className="grid w-full items-center gap-4">
                                            <h1>{group.github_url}</h1>
                                            <h1>{group.total_members}</h1>
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" onClick={() => handleOpen(group.group_name)}>Open</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )

                })}
            </div>
        </>
    );
}