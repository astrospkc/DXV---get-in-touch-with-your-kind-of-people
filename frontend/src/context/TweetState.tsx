"use client"
import { createContext, useState } from 'react'


interface Item {
    id: number; // or string, depending on your API
    content: string,
    userId: number,
    num_likes: number
    // Add other properties as needed
}

interface TweetContextType {
    getTweets: Item[];
    setGetTweets: React.Dispatch<React.SetStateAction<Item[]>>;
    getAllTweets: () => Promise<void>;
}

const TweetContext = createContext<TweetContextType | undefined>(undefined);
function TweetState({ children }: { children: React.ReactNode }) {

    const [getTweets, setGetTweets] = useState<Item[]>([])
    const [createTweet, setCreateTweet] = useState({});
    const [userTweets, setUserTweets] = useState([])

    const getAllTweets = async () => {


        const res = await fetch("http://localhost:8000/tweet/tweets")
        const data = await res.json();
        console.log(data)
        setGetTweets(data)

        console.log("get tweets: ", getTweets)
    }



    const generateTweet = async (props) => {
        const { media_url, content, num_likes } = props;
        const token = localStorage.getItem("token")
        console.log("token: ", token)
        const res = await fetch("http://localhost:8000/tweet/insertTweets", {
            method: 'POST',

            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                // media_url: media_url,
                content: content,

                // num_likes: num_likes
            })
        })
        console.log("res: ", res)
        if (!res.ok) {
            console.log("failed to create tweet")
        }

        const data = await res.json()
        console.log("tweet: ", data)
        setCreateTweet(data);
        console.log("create tweet: ", createTweet)

    }

    // get tweets of single user:
    const getUserTweets = async () => {
        const token = localStorage.getItem("token")
        console.log("token: ", token)
        const res = await fetch("http://localhost:8000/tweet/user_tweets", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        console.log("res: ", res)
        if (!res.ok) {
            console.log("failed to get tweets")
        }
        const data = await res.json()
        console.log("data: ", data)
        setUserTweets(data)

    }

    return (
        <TweetContext.Provider value={{
            getTweets,
            setGetTweets,
            getAllTweets, generateTweet, createTweet, setCreateTweet,
            userTweets, setUserTweets, getUserTweets
        }}>{children}</TweetContext.Provider>
    )
}

export { TweetContext, TweetState }