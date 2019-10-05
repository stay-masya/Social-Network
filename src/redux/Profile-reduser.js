import {profileAPI} from "../api/api";

const ADD_POST ='ADD-POST';
const UPDATE_NEW_POST_TEXT ='UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE ='SET-USER-PROFILE';
const GET_STATUS ='GET_STATUS';
const SET_STATUS ='SET_STATUS';


export const addPostActionCreator= ()=>{
    return{
        type: ADD_POST
    }
};

export const updateNewPostTextActionCreator = (textPostAlert)=>{
    return{
        type : UPDATE_NEW_POST_TEXT, sameValuePosts : textPostAlert
    }
};

export const setUserProfileAC = (profilePage)=>{
    return{
        type : SET_USER_PROFILE, profilePage
    }
};

export const setUserStatusAC = (status)=>{
    return{
        type : SET_STATUS, status
    }
};

export const getUserStatusAC = (status)=>{
    return{
        type : GET_STATUS, status
    }
};
//   THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK

export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.setUserPage(userId)
            .then(response => {
                dispatch(setUserProfileAC(response.data))
            })
    }
};

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(getUserStatusAC(response.data))
            })
    }
};
export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode===0){
                dispatch(setUserStatusAC(status))
                }
            })
    }
};



let initialState ={
    posts: [
        {id: 1, info: "Hello,it`s me))", like: 3},
        {id: 2, info: "lol,i can do it!!!!:)", like: 99},

    ],
    textareaPosts: '',
    status:'',
    profilePage : null
}

const profileReducer = (state = initialState,action) => {

    switch (action.type) {

        case UPDATE_NEW_POST_TEXT:{
            return  {...state,
                textareaPosts : action.sameValuePosts
            };

        }

        case ADD_POST:{
            return {...state,
                posts : [{id: 3,info: state.textareaPosts,like: 0},...state.posts],
                textareaPosts : ''
            };

        }

        case SET_USER_PROFILE:{
            return  {...state,
                profilePage : action.profilePage
            };

        }

        case GET_STATUS:{
            return  {...state,
                status  : action.status
            };
        }

        case SET_STATUS:{
            return  {...state,
                status  : action.status
            };
        }

        default:{
            return state
        }

    }


};
export default profileReducer;