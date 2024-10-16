
import { Skeleton, Stack } from '@chakra-ui/react'

const ChatLoading = () => {
    return (
        <Stack>
            {
                Array.from({ length: 6 }, (_, index) => {
                    return <Skeleton key={index} height='20px' />
                })
            }

        </Stack>
    )
}

export default ChatLoading