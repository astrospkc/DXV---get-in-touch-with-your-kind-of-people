"use client"

import dateFormat from '@/components/miscellaneous/dateFormat'
import TweetCardExtension from '@/components/TweetCardExtension'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProfilePage = ({ params }) => {
    // need user details and user tweets and groups
    const [userDetails, setUserDetails] = useState()
    const [userTweets, setUserTweets] = useState()
    const [userGroups, setUserGroups] = useState()

    // get user details
    const getUserDetailsWithId = async () => {
        const token = localStorage.getItem("token")
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/getUserInfoId/${params.userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.data
            console.log("user details in profile page: ", data)
            setUserDetails(data)
        } catch (error) {
            throw new Error("Error fetching user details")
        }
    }



    // get all the users tweets

    const getUserTweetsWithId = async () => {
        const token = localStorage.getItem("token")
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/tweet/userTweets/${params.userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.data
            console.log("user tweets in profile page: ", data)
            setUserTweets(data)
        } catch (error) {
            throw new Error("Error fetching user tweets")
        }
    }

    useEffect(() => {
        getUserDetailsWithId()
        getUserTweetsWithId()
    }, [params.userId])



    return (
        <div className='flex flex-col justify-center items-center m-auto my-10 text-yellow-300'>

            <div>
                all the tweets will be here the information and all {params.userId}
            </div>
            {/* user details will be shown here */}
            <div className='m-4 p-4 bg-yellow-400 rounded-4'>
                {
                    userDetails && (
                        <div className='flex flex-col gap-4 text-black'>
                            <h1>{userDetails[0].name}</h1>
                            <h1>{userDetails[0].username}</h1>
                        </div>
                    )
                }
            </div>

            {/* user tweets will be shown here */}
            <div>
                {
                    userTweets && userTweets?.map((ele) => {
                        return (
                            <div key={ele.id}>
                                <TweetCardExtension
                                    key={ele.id}
                                    props={ele}
                                />
                            </div>

                        )
                    })
                }
            </div>


            <div>

            </div>
        </div>
    )
}

export default ProfilePage
