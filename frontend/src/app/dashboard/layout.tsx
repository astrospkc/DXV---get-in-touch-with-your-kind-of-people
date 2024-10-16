"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import Header from "@/components/Header";
import { ReactNode, useState, useEffect, useContext } from "react";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserContext, UserState } from "@/context/UserState";
import { HeaderContext } from "@/context/HeaderState";


type DashboardLayoutProps = {
    children: ReactNode;
};

export default function DashboardLayout({ children }: FormLayoutProps) {

    // const { isHidden, handleScroll } = useContext(HeaderContext)
    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext)
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("token: ", token)
        setIsAuthenticated(!!token)

    }, [])

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll)
    // }, [])
    console.log("is authenticated in dashboard layout: ", isAuthenticated)
    return (

        <div className="flex flex-col h-screen w-screen ">
            {/* <div className={`header ${isHidden ? 'hidden' : ''}`}> */}
            {/* <Header /> */}
            {/* </div> */}

            <div className="flex flex-1 flex-row overflow-y-hidden">
                <div className="w-1/6  overflow-y-hidden "><LeftBar /></div>
                {
                    !isAuthenticated ?
                        //  bg-gradient-to-r from-indigo-950 to-cyan-950       
                        <div className="w-4/6  flex flex-col h-full overflow-y-scroll justify-center items-center m-auto text-xl text-center ">Authenticate yourself first by login or signup , we would be happy to share the interesting ideas.
                            <Link href="/"><Button>Go Back</Button></Link>
                        </div>
                        :
                        <div className="w-3/5  flex-1 overflow-y-scroll shadow-xl shadow-stone-700 px-8 ">{children}</div>

                }
                <div className=" w-1/6  overflow-y-scroll px-6 "><RightBar /></div>

            </div>
        </div>


    );
}
