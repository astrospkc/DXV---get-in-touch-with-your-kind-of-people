"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import Header from "@/components/Header";
import { ReactNode, useState, useEffect } from "react";
import MainContent from "@/components/MainContent";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GroupState } from "@/context/GroupState";
import { UserState } from "@/context/UserState";
import { TweetState } from "@/context/TweetState";
import { LoaderState } from "@/context/LoaderState";


// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "Create Next App",
//     description: "Generated by create next app",
// };

type FormLayoutProps = {
    children: ReactNode;
};

export default function FormLayout({ children }: FormLayoutProps) {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("token: ", token)
        setIsAuthenticated(!!token)

    }, [])

    console.log("is authenticated: ", isAuthenticated)
    return (
        <LoaderState>

    
        <UserState>
            <TweetState>



                <GroupState>
                    <div className="flex flex-col h-screen w-screen">

                        <Header />
                        <div className="flex flex-1 flex-row overflow-y-hidden">
                            <div className="w-1/5  overflow-y-hidden border-r-2"><LeftBar /></div>
                            {
                                !isAuthenticated ?
                            
                                    <div className="w-3/5  flex flex-col h-full overflow-y-scroll border-r-2 bg-gradient-to-r from-indigo-950 to-red-950 justify-center items-center m-auto text-xl text-center ">Authenticate yourself first by login or signup , we would be happy to share the interesting ideas.
                                        <Link href="/"><Button>Go Back</Button></Link>
                                    </div>
                                    :
                                    <div className="w-3/5  flex-1 overflow-y-scroll border-r-2 bg-gradient-to-r from-indigo-950 to-red-950 ">{children}</div>

                            }
                            <div className=" w-1/5  overflow-y-scroll px-6 "><RightBar /></div>



                        </div>



                    </div>

                </GroupState>



            </TweetState>
        </UserState>
        </LoaderState>

    );
}
