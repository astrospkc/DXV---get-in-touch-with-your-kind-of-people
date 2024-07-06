import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
    return (
        <div className='flex flex-col justify-center m-auto bg-slate-800 h-screen'>
            <h1 className='text-5xl font-bold  m-auto text-white'>DXV</h1>
            <Button asChild className='w-fit m-auto my-4'><Link href="/sign-in">Sign in</Link></Button>
            <Button asChild className='w-fit m-auto my-4'><Link href="/login">login</Link></Button>



        </div>
    )
}

export default LandingPage
