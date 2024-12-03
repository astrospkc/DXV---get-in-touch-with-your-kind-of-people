"use client"

import Header from "@/components/Header";
import { ReactNode, useState, useEffect, useContext } from "react";
import "@/app/globals.css"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserContext, UserState } from "@/context/UserState";

import GroupsLeftBar from "@/components/GroupsLeftBar";



// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "Create Next App",
//     description: "Generated by create next app",
// };

type GroupDashboardLayoutProps = {
    children: ReactNode;
};

export default function GroupDashboardLayout({ children }: GroupDashboardLayoutProps) {


    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { isAuthenticated } = useContext(UserContext)
    console.log("is authenticated: ", isAuthenticated)



    return (

        <div className="flex flex-col h-screen w-screen ">

            <Header />
            <div className="flex flex-1 flex-row overflow-y-hidden">
                <div className="w-1/5  overflow-y-hidden border-r-2"><GroupsLeftBar /></div>
                {
                    !isAuthenticated ?

                        <div className="w-3/5  flex flex-col h-full overflow-y-scroll b justify-center items-center m-auto text-xl text-center ">Its a groups dashboardAuthenticate yourself first by login or signup , we would be happy to share the interesting ideas.
                            <Link href="/"><Button>Go Back</Button></Link>
                        </div>
                        :
                        <div className="w-3/5  flex-1 overflow-y-scroll border-r-2 bg-gray-900 ">{children}</div>

                }

            </div>
        </div>
    );
}
