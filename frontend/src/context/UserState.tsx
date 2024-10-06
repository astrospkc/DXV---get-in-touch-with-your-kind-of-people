"use client"
import { createContext, useEffect, useState } from 'react'

const UserContext = createContext(null)

const UserState = ({ children }: any) => {
    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)


    const fetchUserDetails = async () => {
        const token = localStorage.getItem("token");
        console.log('token in userstate: ', token)
        const response = await fetch(`http://localhost:7000/api/user_info`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}` // Fixed typo here
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const userDetails = await response.json();
        setUser(userDetails);
        console.log('User details: ', userDetails);
    };
    console.log("user: ", user)




    return (

        <UserContext.Provider value={{ user, setUser, fetchUserDetails, isAuthenticated, setIsAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserState }
