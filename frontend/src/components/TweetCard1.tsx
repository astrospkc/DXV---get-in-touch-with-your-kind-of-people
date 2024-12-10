"use client";
import React, { useContext, useEffect, useState } from "react";
import { Divide, Heart, MessageCircle, Repeat2, Router, Share } from "lucide-react";
import { LoaderContext } from "@/context/LoaderState";
import Image from "next/image";
import { TweetContext } from "@/context/TweetState";
import "./styles.css"
import { Button } from "./ui/button";
import axios from 'axios'
import { UserContext } from "@/context/UserState";
import Link from "next/link";
import dateFormat from "./miscellaneous/dateFormat";
import TweetCardExtension from "./TweetCardExtension";


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

                    </>
            }


        </>
    );
};

export default TweetCard1;
