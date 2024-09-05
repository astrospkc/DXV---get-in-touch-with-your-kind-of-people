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


export default function Groups() {
    const router = useRouter()
    const group_context = useContext(GroupContext);

    if (!group_context) {
        throw new Error("CardWithForm must be used within a GroupProvider");
    }

    const { usergroup, setUserGroup, fetchCreatedGroups } = group_context;
    useEffect(() => {
        fetchCreatedGroups()
    }, [])
    console.log("user group: ", usergroup);

    const handleOpen = () => {
        router.push("/dashboard/groups/groupsDashboard")
    }

    return (
        <>
            <div className="flex flex-row justify-center items-center m-auto  ">
                <div className=" flex-1 text-center border-2 border-gray-700 p-3 hover:cursor-pointer hover:bg-gradient-to-tr from-cyan-800 to-cyan-500">Groups Created</div>
                <div className="flex-1 text-center border-2 border-gray-700 p-3  hover:cursor-pointer hover:bg-gradient-to-tr from-cyan-800 to-cyan-500">Groups Joined</div>
            </div>
            <div className="justify-center grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {usergroup && usergroup.map((group) => {
                    return (

                        <div key={group.group_id}>
                            <Card className="w-[350px] shadow-gray-700 shadow-xl hover:scale-95 hover:bg-gradient-to-r from-black to-slate-500">
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
                                    <Button variant="outline" onClick={handleOpen}>Open</Button>
                                </CardFooter>
                            </Card>
                        </div>


                    )

                })}
            </div>
        </>
    );
}