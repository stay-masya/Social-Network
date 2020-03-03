import {headerAPI} from "../api/api";
import {stopSubmit} from "redux-form"

const SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA';

type SetUserObjectDataType = {
    email: string |null
    userId: number |null
    login: string |null
    isAuth: boolean
}
type SetUserDataType = {
    type: typeof SET_USER_LOGIN_DATA
    data: SetUserObjectDataType
}
export const setUserData = (email: string | null, userId: number | null, login: string | null, isAuth: boolean ): SetUserDataType => {
    return {
        type: SET_USER_LOGIN_DATA,
        data: {email, userId, login, isAuth}
    }
};

export const setUserLoginData = () => async (dispatch: any) => {
    let response = await headerAPI.setUserLoginData()
    if (response.resultCode === 0) {
        let {email, id, login} = response.data;
        dispatch(setUserData(email, id, login, true))
    }
};
export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let response = await headerAPI.login(email, password, rememberMe)
    if (response.resultCode === 0) {
        dispatch(setUserLoginData())
    } else {
        const errorMessage = response.messages.length > 0 ? response.messages[0] : 'Common error'
        dispatch(stopSubmit("login", {_error: errorMessage}))
    }
};

export const logout = () => async (dispatch: any) => {
    let response = await headerAPI.logout()
    if (response.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }

};

let initialState = {
    email: null as string | null,
    userId: null as number | null,
    login: null as string | null,
    isAuth: false as boolean
};
export type InitialStateType = typeof initialState;


const authReducer = (state = initialState, action: any): InitialStateType => {
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
