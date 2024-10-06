"use client";
import React, { useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserState";
// import {
//     IconBrandGithub,
//     IconBrandGoogle,
//     IconBrandOnlyfans,
// } from "@tabler/icons-react";

export default function Login() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // const { fetchUserDetails } = useContext(UserContext)
    const [credentials, setCredentials] = useState({

        username: "",

        password: "",
    })
    let data: any;
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch("http://localhost:7000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                username: credentials.username,

                password: credentials.password
            })
        })
        data = await res.json()
        console.log("data in login: ", data)

        if (data.success) {
            // storing token in localstorage
            setIsLoading(true)

            localStorage.setItem("token", data.authtoken)

            alert("happy logged in")

            router.push("/dashboard")
            setIsLoading(false)

        } else {
            alert("invalid credentials")

        }



    };

    // useEffect(() => {
    //     const token = data.authtoken
    //     if (token) {
    //         fetchUserDetails(token).then(() => {
    //             console.log("user details fetched successfully ")
    //         }).catch(() => {
    //             console.log("failed to fetch the user details")
    //         })
    //     }
    // }, [fetchUserDetails])

    const handleChange = (e) => {
        e.preventDefault()
        setCredentials({ ...credentials, [e.target.id]: e.target.value })

    }

    const handleLoader = (e) => {
        setIsLoading((prev) => !prev)
    }


    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input  bg-white dark:bg-black">
            <h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
                Welcome to DXV
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                SignUp to DXV
            </p>
            {
                isLoading && <div>....loading</div>
            }

            <form className="my-8" onSubmit={handleSubmit}>


                <LabelInputContainer className="mb-4">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Durdy" type="text" onChange={handleChange} />
                </LabelInputContainer>



                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" onChange={handleChange} />
                </LabelInputContainer>


                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    onClick={handleLoader}
                >
                    Login &rarr;
                    <BottomGradient />
                </button>
                <h1>Already have an account</h1>
                <Link href="/signup">
                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Sign up &rarr;
                        <BottomGradient />
                    </button>
                </Link>


                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />



            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};