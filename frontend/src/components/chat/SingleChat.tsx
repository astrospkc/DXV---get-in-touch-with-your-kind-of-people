"use client"
import { ChatState } from '@/context/ChatState';
import { FormControl, Input, Spinner, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import io, { Socket } from "socket.io-client";
import { FaArrowLeft } from "react-icons/fa";
import ScrollableChat from '@/UsersList/ScrollableChat';

const ENDPOINT = "http://localhost:8000";
let socket: Socket, selectedChatCompare: chatType | null;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();
  console.log("selected chat in single chat: ", selectedChat, selectedChat[0]?.id)

  // const handleBack = () => {
  //   setSelectedChat(null);
  // };

  const fetchMessages = async () => {
    if (!selectedChat || !selectedChat[0].id) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/message/fetchMessages/${selectedChat[0].id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      setMessages(data);
      setLoading(false)
      socket?.emit("join chat", selectedChat[0].id);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Failed to load messages",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket?.emit('setup', user);
    socket.on('connection', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  // notification

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const sendMessage = async (event) => {
    if (event.key !== "Enter" || !newMessage) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/message/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ chatId: selectedChat[0].id, content: newMessage })
      });

      const data = await response.json();
      console.log("send message: ", data)
      socket?.emit("new message", data[0]); // Assuming data[0] contains the message object
      setMessages((prevMessages) => [...prevMessages, data[0]]);

    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send message",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  const typingHandler = (e) => {
    const { value } = e.target;
    console.log("target value: ", e.target.value)
    setNewMessage(value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket?.emit('typing', selectedChat?.id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket?.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);

  };

  return (
    <div className='flex h-full'>
      {selectedChat ? (
        <div className='flex flex-col m-5 w-full'>
          {/* <FaArrowLeft onClick={handleBack} className='text-white md:hidden hover:cursor-pointer scale-90' /> */}
          <div className='text-white flex flex-grow overflow-y-scroll flex-col'>
            {loading ? (
              <Spinner size='xl' h={10} w={10} alignSelf='center' />
            ) : (
              <ScrollableChat messages={messages} />
            )}
          </div>
          <FormControl onKeyDown={sendMessage} isRequired mt={3}>
            {isTyping && <div>loading...</div>}
            <Input
              placeholder='Enter message'
              onChange={typingHandler}
              value={newMessage}
              className='text-white'
            />
          </FormControl>
        </div>
      ) : (
        <div className='flex justify-center items-center w-full h-full text-xl text-white'>
          Select User to get started with chat
        </div>
      )}
    </div>
  );
};

export default SingleChat;