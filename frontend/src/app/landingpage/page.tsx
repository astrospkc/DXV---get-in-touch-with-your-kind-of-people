"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

const LandingPage = () => {


    return (
        <>



            <div className='flex flex-col justify-center m-auto  bg-gradient-to-b from-violet-400 to-gray-500 items-center h-screen w-screen'>
                {/* <div className="relative p-10 bg-black rounded-full shadow-lg flex items-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-950 to-purple-500 blur-md p-4"></div>
                <div className="relative flex flex-col items-center z-10 border-4 border-transparent rounded-lg text-wrap ">
                    <h1 className='text-6xl font-bold my-4 sigmar-one-regular'>DXV</h1>
                    <h1 className='josefin-sans-regular josefin-sans-sub-heading '>Do Xtra Virtually</h1>
                </div>



            </div> */}
                <div className='flex flex-col items-center '>
                    <h1 className='text-6xl font-bold my-4 sigmar-one-regular'>DXV</h1>
                    <h1 className='josefin-sans-regular josefin-sans-sub-heading '>Do Xtra Virtually</h1>
                </div>
                <div className='flex flex-col items-center w-1/2 shadow-lg shadow-violet-300 p-3 rounded-xl josefin-sans-para '>
                    <p className='text-black my-10 flex text-center '>
                        The one and only social platform for people who want to work on ideas with other creative minds.
                    </p>
                    <p className='text-2xl font-semibold text-violet-300'> Bring your ideas , share and work to the next level.</p>
                </div>

                <div className='my-6'>
                    <Button asChild className='mx-3'><Link href="/signup">Sign in</Link></Button>
                    <Button asChild className='mx-3'><Link href="/login">login</Link></Button>
                </div>






            </div>
        </>
    )
}

export default LandingPage
