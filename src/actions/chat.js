export const getMessages = (messages) => {
    return ({
        type: 'GET_MESSAGES',
        messages
    });
};

export const addMessage = (message) => {
    return ({
        type: 'ADD_MESSAGE',
        message: message
    });
}