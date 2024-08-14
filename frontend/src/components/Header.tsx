"use client"
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { DropDown } from './DropDown'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        router.push("/")
        alert("you have logged out successfully")
    }
    return (
        <div className='w-full backdrop-blur-xl z-[100]'>
            <div className='flex justify-between m-4 '>
                <Badge className='w-fit p-4'>DXV</Badge>
                <div className="flex flex-row">
                    <Button onClick={handleLogout}>LogOut</Button>
                    <DropDown />
                </div>

            </div>

        </div>
    )
}

export default Header
