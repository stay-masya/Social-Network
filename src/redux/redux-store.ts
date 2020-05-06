import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./Profile-reduser";
import dialogReducer from "./Dialogs-reduser";
import usersReducer from "./Users-reduser";
import authReducer from "./Auth-reduser";
import {reducer as formReducer} from 'redux-form'
import thunk from "redux-thunk";

let rootReducer = combineReducers(
    {
        profile: profileReducer,
        dialog: dialogReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer
    }
);

type rootReducerType = typeof rootReducer; // (globalState : AppStateType) => AppStateType
export type  AppStateType = ReturnType<rootReducerType> //получили глобальный State, возращаемый функцией

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferReturnType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

const store = createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore
window.store = store;

export default store;
