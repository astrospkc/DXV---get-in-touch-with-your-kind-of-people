"use client";
import React, { useContext, useEffect, useState } from "react";
import { Divide, Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { LoaderContext } from "@/context/LoaderState";
import Image from "next/image";
import { TweetContext } from "@/context/TweetState";
import "./styles.css"
import { Button } from "./ui/button";
import axios from 'axios'
import { UserContext } from "@/context/UserState";

const TweetCard1 = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(1234);
    const tweet_context = useContext(TweetContext)
    const { getTweets, getAllTweets } = tweet_context
    const { isLoading, setIsLoading } = useContext<boolean>(LoaderContext)
    const [follow, setFollow] = useState(false);
    const { user } = useContext<any>(UserContext)
    const [isUserFollowed, setIsUserFollowed] = useState<any>(false)

    // console.log("get tweets: ", getTweets)
    // handling api calls: 
    useEffect(() => {
        setIsLoading(prev => !prev)
        getAllTweets()
        setIsLoading(prev => !prev)

    }, [])

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    }


    return (
        <>
            {
                isLoading ? <div> ... isLoading </div> :

                    <>
                        {
                            getTweets && getTweets.map((ele) => {
                                const tweet_Date = new Date(ele.updatedAt);
                                console.log("url: ", ele.userInfo[0].media_url)
                                const formattedDate = tweet_Date.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                });
                                const formattedTime = tweet_Date.toLocaleTimeString("en-US")

                                return (
                                    <div key={ele.id} className="tweetcard max-w-xl bg-white rounded-xl p-4  text-xs hover:bg-blue-950  ">
                                        <div className="flex space-x-3">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                {/* <div className="h-12 w-12 rounded-full bg-gray-200" /> */}
                                                <Image src={ele.userInfo[0].media_url} width={50} height={50} alt='avatar' className='rounded-full' />

                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 space-y-1">
                                                {/* User info */}
                                                <div className="flex items-center space-x-2 ">
                                                    <span className=" text-xl font-bold text-blue-300">{ele.userInfo[0].name}</span>
                                                    <span className=" text-xl text-gray-500">@{ele.userInfo[0].username}</span>
                                                    <span className="text-gray-500">·</span>
                                                    <span className="text-gray-500 text-md">{formattedDate}</span>
                                                    <span className="text-gray-500 text-md">{formattedTime}</span>



                                                </div>

                                                {/* Tweet text */}
                                                <p className="text-gray-200  comic-neue-light py-4 hover:cursor-pointer hover:bg-slate-900 rounded-3xl px-2 ">
                                                    {ele.content}
                                                </p>

                                                {/* Image placeholder */}
                                                <div className="mt-3 rounded-2xl bg-gray-700 aspect-[5/1] w-full" />

                                                {/* Action buttons */}
                                                <div className="flex justify-between mt-3 text-gray-500 ">
                                                    <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors ">
                                                        <MessageCircle className="h-5 w-5" />
                                                        <span>234</span>
                                                    </button>

                                                    <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                                                        <Repeat2 className="h-5 w-5" />
                                                        <span>456</span>
                                                    </button>

                                                    <button
                                                        className={`flex items-center space-x-2 transition-colors ${isLiked ? "text-pink-600" : "hover:text-pink-600"
                                                            }`}
                                                        onClick={handleLike}
                                                    >
                                                        <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                                                        <span>{likeCount}</span>
                                                    </button>

                                                    <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                                                        <Share className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </>
            }


        </>
    );
};

export default TweetCard1;
