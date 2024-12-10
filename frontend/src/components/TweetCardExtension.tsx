"use client"
import React, { useState } from 'react'
import { Divide, Heart, MessageCircle, Repeat2, Router, Share } from "lucide-react";
import Link from "next/link";
import dateFormat from "./miscellaneous/dateFormat";
import Image from "next/image";


const TweetCardExtension = ({ props }) => {



    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(1234);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    }


    const date = dateFormat(props.updatedAt)

    return (
        <div key={props.id} className="tweetcard max-w-xl bg-white rounded-xl p-4  text-xs hover:bg-blue-950  ">
            <div className="flex space-x-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {/* <div className="h-12 w-12 rounded-full bg-gray-200" /> */}
                    <Image src={props.userInfo[0].media_url} width={50} height={50} alt='avatar' className='rounded-full' />

                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                    {/* User info */}
                    <div className="flex items-center space-x-2 ">
                        <span className=" text-xl font-bold text-blue-300" >
                            <Link href={`/dashboard/${props.userInfo[0].id}`}>
                                {props.userInfo[0].name}
                            </Link>

                        </span>
                        <span className=" text-xl text-gray-500">@{props.userInfo[0].username}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500 text-md">{date.formattedDate}</span>
                        <span className="text-gray-500 text-md">{date.formattedTime}</span>



                    </div>

                    {/* Tweet text */}
                    <p className="text-gray-200  comic-neue-light py-4 hover:cursor-pointer hover:bg-slate-900 rounded-3xl px-2 ">
                        {props.content}
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
}

export default TweetCardExtension
