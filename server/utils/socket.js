
export const addNewUser = (username, socketId) => {
    //some return boolean
    !onlineUsers.some((user) => user.username === username) &&
        onlineUsers.push({ username, socketId });
}

export const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}

export const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
}