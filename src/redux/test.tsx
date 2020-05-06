import {headerAPI, ResultCodeEnum} from "../api/api";
import {stopSubmit} from "redux-form"

const SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA';

type SetUserObjectDataType = {
    email: string | null
    userId: number | null
    login: string | null
    isAuth: boolean
}
type SetUserDataType = {
    type: typeof SET_USER_LOGIN_DATA
    data: SetUserObjectDataType
}
export const setUserData = (email: string | null, userId: number | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_LOGIN_DATA,
        data: {email, userId, login, isAuth}
    } as const
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
    if (response.resultCode === ResultCodeEnum.Success) {
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





type TestPhotoType = {
    img: string
    size: string
}
type TestProfileType = {
    img: string
    size: string
    bool: boolean
}



type NullableType<T> = T extends "photo"? TestPhotoType : TestProfileType

let initialState = {
    email: null as string | null,
    userId: null as number | null,
    login: null as string | null,
    isAuth: false as boolean,
};
export type InitialStateType = typeof initialState;

let a : NullableType<"photo">={
    img:"",
    size:""
}

let b ={
    bool:true,
    img:"",
    size:""
}

const actions={
    AC1 : (firstName: string, lastName: string) => ({type: "SET-AGE", firstName, lastName} as const),
    AC2 : (firstName1: string, lastName1: string) => ({type: "SET-AGE1", firstName1, lastName1} as const)
}

type SameType<T> = T  extends {[key:string]: infer U} ? U : never

let test:ReturnType<SameType<typeof actions>> = {type: "SET-AGE1", firstName1:"firstName", lastName1:"lastName"}

// type test = ReturnType<typeof AC1>

// type AC1Type = ReturnType<typeof AC1>
// const tipaDispatch: AC1Type = {type: "SET-AGE", firstName: "Max", lastName: "Litus"}


const authReducer = (state = initialState, action: ReturnType<typeof actions.AC1>): InitialStateType => {
    switch (action.type) {
        case "SET-AGE":
            return {
                ...state, login: action.lastName
            }

        default: {
            return state
        }
    }
};
export default authReducer;
