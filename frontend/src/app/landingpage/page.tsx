import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
    return (
        <div className='flex flex-col justify-center m-auto bg-gray-900 items-center h-screen w-screen'>
            <div className="relative p-10 bg-black rounded-full shadow-lg flex items-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-950 to-purple-500 blur-md p-4"></div>
                <div className="relative flex flex-col items-center z-10 border-4 border-transparent rounded-lg text-wrap">
                    <h1 className='text-6xl font-bold my-4'>DXV</h1>

                    <p className='text-white'>
                        Come and Let&apos;s meet people who share ideas
                    </p>
                </div>

            </div>
            <div className='my-6'>
                <Button asChild className='mx-3'><Link href="/signup">Sign in</Link></Button>
                <Button asChild className='mx-3'><Link href="/login">login</Link></Button>
            </div>

            {/* <div className='my-4 flex flex-col items-center border-2 border-blue-500 p-20 rounded-full '>

                
            </div>

            <div className='my-6'>
                <Button asChild className='mx-3'><Link href="/sign-in">Sign in</Link></Button>
                <Button asChild className='mx-3'><Link href="/login">login</Link></Button>
            </div> */}




        </div>
    )
}

export default LandingPage
