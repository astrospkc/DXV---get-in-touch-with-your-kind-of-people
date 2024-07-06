import React from 'react'
import { Badge } from "@/components/ui/badge"
import { DropDown } from './DropDown'

const Header = () => {
    return (
        <div>
            <div className='flex justify-between m-4'>
                <Badge className='w-fit'>DXV</Badge>
                <DropDown />
            </div>

        </div>
    )
}

export default Header
