import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '@/components/config/ChatLogic';
import { ChatState } from '@/context/ChatState';
import { Tooltip, Avatar } from '@chakra-ui/react';
import ScrollableFeed from 'react-scrollable-feed';

// Interface for message props
// Uncomment if you need to enforce types
// interface ScrollableChatProps {
//     messages: MessageProps[]
// }

// const ScrollableChat = ({ messages }: ScrollableChatProps) => {
const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();
    const userId = user ? user.id : '';
    const user_id = parseInt(userId);
    console.log("messages: ", messages)

    return (
        <ScrollableFeed>
            {messages && messages.map((m, i) => {
                // Log the sender's name
                console.log(m.sender[0].name);

                return (
                    <div className='flex' key={i}>
                        {(isSameSender(messages, m, i, user_id) || isLastMessage(messages, m, i, user_id)) && (

                            <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                                <Avatar
                                    mt="7px"
                                    mr={1}
                                    size="sm"
                                    cursor="pointer"
                                    name={m.sender[0].name}
                                    src={m.sender.pic}
                                />


                            </Tooltip>
                        )}
                        <span
                            className='text-black w-fit rounded-2xl p-3 my-2'
                            style={{
                                backgroundColor: `${m.sender_id === user_id ? '#BEE3F8' : '#B9F5D0'}`,
                                marginLeft: isSameSenderMargin(messages, m, i, user_id),
                                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                );
            })}
        </ScrollableFeed>
    );
};

export default ScrollableChat;