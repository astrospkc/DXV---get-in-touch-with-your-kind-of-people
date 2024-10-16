"use client"
import { createContext, useEffect, useState } from 'react'

const UserContext = createContext(null)

const UserState = ({ children }: any) => {
    const [user, setUser] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    return (

        <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserState }
