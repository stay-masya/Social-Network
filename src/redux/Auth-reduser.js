import {headerAPI} from "../api/api";

const SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA';

export const setUserData = (email,userId,login ) => {
    return {
        type : SET_USER_LOGIN_DATA,
        data : {email,userId,login}

    }
};

export const setUserLoginData = () =>{
    return (dispatch) => {
        headerAPI.setUserLoginData()
            .then(response =>{
                if (response.resultCode ===0){
                    let {email , id ,login} = response.data;
                    dispatch(setUserData(email,id,login))
                }
            })
    };

};


let initialState = {
    email:null,
    userId:null,
    login:null,
    isAuth : false

};


const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_LOGIN_DATA: {

            return {
                ...state,
                ...action.data,
                isAuth :true
            }
        }

        default: {
            return state
        }

    }
};

export default authReducer;