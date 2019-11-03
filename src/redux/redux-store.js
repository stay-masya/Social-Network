import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./Profile-reduser";
import dialogReducer from "./Dialogs-reduser";
import usersReducer from "./Users-reduser";
import authReducer from "./Auth-reduser";
import { reducer as formReducer } from 'redux-form'
import thunk from "redux-thunk";

let reducers = combineReducers(
    {
        profile:profileReducer,
        dialog:dialogReducer,
        usersPage:usersReducer,
        auth: authReducer,
        form: formReducer
    }
);

const store = createStore(reducers , applyMiddleware(thunk));


window.store = store;

export default store;
