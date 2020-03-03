import {profileAPI} from "../api/api";
import {PostsType, ProfilePageType} from "../types/types";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const GET_STATUS = 'GET_STATUS';
const SET_STATUS = 'SET_STATUS';

type AddPostActionCreatorType = {
    type: typeof ADD_POST
}
export const addPostActionCreator = (): AddPostActionCreatorType => {
    return {
        type: ADD_POST
    }
};

type UpdateNewPostTextActionCreatorType = {
    type: typeof UPDATE_NEW_POST_TEXT
    sameValuePosts: string
}
export const updateNewPostTextActionCreator = (textPostAlert: string): UpdateNewPostTextActionCreatorType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        sameValuePosts: textPostAlert
    }
};

type SetUserProfileACType = {
    type: typeof SET_USER_PROFILE,
    profilePage: number
}
export const setUserProfileAC = (profilePage: number): SetUserProfileACType => {
    return {
        type: SET_USER_PROFILE, profilePage
    }
};

type SetUserStatusACType = {
    type: typeof SET_STATUS
    status: string
}
export const setUserStatusAC = (status: string): SetUserStatusACType => {
    return {
        type: SET_STATUS, status
    }
};

type GetUserStatusACType = {
    type: typeof GET_STATUS
    status: string
}
export const getUserStatusAC = (status: string): GetUserStatusACType => {
    return {
        type: GET_STATUS,
        status
    }
};
//   THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.setUserPage(userId)
    dispatch(setUserProfileAC(response.data))
};

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(getUserStatusAC(response.data))
};
export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatusAC(status))
    }
};

let initialState = {
    posts: [
        {id: 1, info: "Hello,it`s me))", like: 3},
        {id: 2, info: "lol,i can do it!!!!:)", like: 99},

    ] as Array<PostsType>,
    textareaPosts: '',
    status: '',
    profilePage: null as ProfilePageType | null
};
type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                textareaPosts: action.sameValuePosts
            };
        }
        case ADD_POST: {
            return {
                ...state,
                posts: [{id: 3, info: state.textareaPosts, like: 0}, ...state.posts],
                textareaPosts: ''
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profilePage: action.profilePage
            };
        }
        case GET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        default: {
            return state
        }
    }
};
export default profileReducer;
