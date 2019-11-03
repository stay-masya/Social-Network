import {headerAPI} from "../api/api";
import {stopSubmit} from "redux-form"

const SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA';

export const setUserData = (email, userId, login, isAuth) => {
    return {
        type: SET_USER_LOGIN_DATA,
        data: {email, userId, login, isAuth}
    }
};

export const setUserLoginData = () => {
    return (dispatch) => {
        headerAPI.setUserLoginData()
            .then(response => {
                if (response.resultCode === 0) {
                    let {email, id, login} = response.data;
                    dispatch(setUserData(email, id, login, true))
                }
            })
    };
};
export const login = (email, password, rememberMe) => dispatch => {
    headerAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(setUserLoginData())
            } else {
                const errorMessage = response.messages.length > 0 ? response.messages[0] : 'Common error'
                dispatch(stopSubmit("login", {_error: errorMessage}))
            }
        })
};

export const logout = () => dispatch => {
    headerAPI.logout()
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        })
};


let initialState = {
    email: null,
    userId: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LOGIN_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        default: {
            return state
        }
    }
};
export default authReducer;