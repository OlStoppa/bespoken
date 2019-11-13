import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import userReducer from '../reducers/userReducer';
import chatReducer from '../reducers/chatReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            form: formReducer,
            user: userReducer,
            chat: chatReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};