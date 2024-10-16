'use client';

// import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { Button } from '@/components/ui/button'
import { GroupState } from "@/context/GroupState";
import { UserState } from "@/context/UserState";
import { TweetState } from "@/context/TweetState";
import { LoaderState } from "@/context/LoaderState";
import { ChatProvider } from "@/context/ChatState";
import { HeaderState } from '@/context/HeaderState';

export function Providers({ children }: { children: React.ReactNode }) {
    return (

        <ChakraProvider>

            <ChatProvider>
                <LoaderState>
                    <UserState>
                        <TweetState>
                            <GroupState>
                                {/* <HeaderState> */}
                                {children}
                                {/* </HeaderState> */}
                            </GroupState>
                        </TweetState>
                    </UserState>
                </LoaderState>

            </ChatProvider>

        </ChakraProvider>

    );
}