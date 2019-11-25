const colors = ['purple', 'pink', 'green', 'orange'];

export const setUsername = (username) => dispatch => {

    return new Promise((res, rej) => {
        const color = colors[Math.floor(Math.random() * 4)];
        dispatch({
            type: 'SET_USERNAME',
            username,
            color,
        });
        res()
    })
}

export const resetUser = () => ({
    type: 'RESET_USER'
})