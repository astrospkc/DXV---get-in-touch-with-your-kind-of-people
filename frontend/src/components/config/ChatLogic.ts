export const getSender = (loggedUser, users) => {
    if (loggedUser && users) {
        return users[0].id == loggedUser.id ? users[1].name : users[0].name
    } else {
        return "no users found"
    }
}
export const getSenderFull = (loggedUser, users) => {
    if (loggedUser && users) {
        return users[0].id == loggedUser.id ? users[1] : users[0]
    } else {
        return "no users found"
    }
}
export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 && (messages[i + 1].sender_id !== m.sender_id || messages[i + 1].sender_id === undefined) && messages[i].sender_id !== userId
    )
}
export const isLastMessage = (messages, m, i, userId) => {
    return (
        i === messages.length - 1 && messages[messages.length - 1].sender_id !== userId && messages[messages.length - 1].sender_id
    )
}
export const isSameSenderMargin = (messages, m, i, userId) => {
    if (
        i < messages.length - 1 && messages[i + 1].sender_id === m.sender_id && messages[i].sender_id !== userId
    ) return 33;
    else if ((i < messages.length - 1 && messages[i + 1].sender_id !== m.sender_id && messages[i].sender_id !== userId) || (i === messages.length - 1 && messages[i].sender_id !== userId))
        return 0;
    else return "auto"
}
export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender_id === m.sender_id
}