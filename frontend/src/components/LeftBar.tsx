"use client";
import React, { useContext, useState } from 'react';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TweetContext } from '@/context/TweetState';
import { useRouter } from 'next/navigation';
import ProfileInfo from './ProfileInfo';

const tags = [
    { id: 1, tag: "Home", link: "/dashboard" },
    { id: 2, tag: "Create Group", link: "/dashboard/createGroup" },
    { id: 3, tag: "Groups", link: "/dashboard/groups" },
    { id: 4, tag: "Tweets", link: "/dashboard/tweets" },
    { id: 5, tag: "Profile", link: "/dashboard/profile" },
    { id: 6, tag: "About", link: "/dashboard/about" },
    { id: 7, tag: "Notification", link: "/dashboard/notification" },
];

const LeftBar = () => {
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);

    const createTweet_context = useContext(TweetContext);
    const { generateTweet } = createTweet_context;
    const [tweet, setTweet] = useState({
        content: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log("tweet handle submit: ", tweet);
        console.log("clicking the post");
        try {
            await generateTweet(tweet);
            alert("Tweet created successfully");
            router.push("/dashboard");
        } catch (error) {
            console.log("Not able to create tweet: ", error);
            alert("Some error occurred, please post your tweet again");
            return;
        }

        setIsClicked(false); // Close the dialog after submission
    };

    const handleChange = (e) => {
        setTweet({ ...tweet, [e.target.name]: e.target.value });
    };
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        router.push("/")
        alert("you have logged out successfully")
    }

    return (
        <div className='m-3 mx-6 flex flex-col justify-around items-center h-full text-gray-400 '>
            <Badge className='w-fit p-4'>DXV</Badge>
            <div className='flex flex-col w-fit'>
                {tags.map((tag) => (
                    <Link href={tag.link} key={tag.id}>
                        <Button variant="outline" className="mb-2">{tag.tag}</Button>
                        {/* <Badge className='my-3 bg-slate-500 text-white p-2 hover:cursor-pointer hover:scale-125'>
                            {tag.tag}
                        </Badge> */}
                    </Link>
                ))}
                <div className="flex flex-col gap-4">
                    <Button onClick={handleLogout} variant="destructive">LogOut</Button>
                    {/* <DropDown /> */}
                    <ProfileInfo />
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <Dialog open={isClicked} onOpenChange={setIsClicked}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsClicked(true)} variant="outline" className='bg-white my-3'>Post</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Tweet Post</DialogTitle>
                            <DialogDescription>
                                Tweet about your latest knowledge
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Textarea name="content" placeholder="Type your message here." onChange={handleChange} />
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" type="submit" onClick={handleSubmit}>Post</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <div className='flex flex-row text-sm justify-center items-center mb-6'>
                    <div className='w-full p-4 bg-black rounded-full'>Avatar</div>
                    <div className='mx-2'>
                        <h1>Holder Name</h1>
                        <h1>@GroupName</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftBar;