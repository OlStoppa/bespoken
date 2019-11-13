export const setUsername = (username) =>  dispatch => {
    return new Promise((res, rej) => {
        dispatch({
            type: 'SET_USERNAME',
            username
        });
        res()
    })   
        
}