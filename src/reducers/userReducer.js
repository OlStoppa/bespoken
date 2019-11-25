export const initialState = {
    username: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'SET_USERNAME':
            return {
                username: action.username,
                color: action.color
            };

        case 'RESET_USER':
            return {};

        default:
            return state;
    }
}