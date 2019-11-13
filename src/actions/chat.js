export const getMessages = (messages) => dispatch => {
    dispatch({
        type: 'GET_MESSAGES',
        messages
    });
};

export const addMessage = (message) => dispatch => {
   dispatch({
        type: 'ADD_MESSAGE',
        message: message
    });
}