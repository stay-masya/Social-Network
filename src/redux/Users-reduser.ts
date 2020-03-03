import {usersAPI} from "../api/api";
import {PhotosType, UsersType} from "../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const GET_USERS = 'GET-USERS'
const PAGE_CHANGE = 'PAGE-CHANGE'
const TOTAL_USER_COUNT_CHANGE = 'TOTAL_USER_COUNT_CHANGE'
const TOGGLE_SWITCH = 'TOGGLE_SWITCH'
const TOGGLE_PROGRES_BUTTON = 'TOGGLE_PROGRES_BUTTON'

type UnFollowACType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unFollowAC = (userId: number): UnFollowACType => {
    return {
        type: UNFOLLOW,
        userId: userId
    }
};

type FollowACType = {
    type: typeof FOLLOW,
    userId: number
}
export const followAC = (userId: number): FollowACType => {
    return {
        type: FOLLOW,
        userId: userId
    }
};

type GetUsersACType = {
    type: typeof GET_USERS,
    users: Array<UsersType>
}
export const getUsersAC = (user: Array<UsersType>): GetUsersACType => {
    return {
        type: GET_USERS,
        users: user
    };
};

export const getPageAC = (page: number) => {
    return {
        type: PAGE_CHANGE,
        page: page
    };
};

export const getTotalUsersAC = (number: number) => {
    return {
        type: TOTAL_USER_COUNT_CHANGE,
        number: number
    };
};

export const toggleSwitchAC = (status: boolean) => {

    return {
        type: TOGGLE_SWITCH,
        loadStatus: status
    };
};

export const toggleProgresButtonAC = (progresStatus: boolean, id: number) => {

    return {
        type: TOGGLE_PROGRES_BUTTON,
        progresStatus,
        id
    };
};

export const getUsers = (pageSize: number, currentPage: number) => async (dispatch: any) => {
    dispatch(getPageAC(currentPage))
    dispatch(toggleSwitchAC(true))
    let response = await usersAPI.getUsers(pageSize, currentPage)
    dispatch(toggleSwitchAC(false))
    dispatch(getUsersAC(response.items))
    dispatch(getTotalUsersAC(response.totalCount))
};


//   THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK

export const unFollow = (userId: number) => async (dispatch: any) => {
    dispatch(toggleProgresButtonAC(true, userId))
    let response = await usersAPI.unFollow(userId)
    if (response.resultCode === 0) {
        dispatch(unFollowAC(userId))
    }
    dispatch(toggleProgresButtonAC(false, userId));
};

export const follow = (userId: number) => async (dispatch:any) => {
    dispatch(toggleProgresButtonAC(true, userId))
    let response = await usersAPI.follow(userId)
    if (response.resultCode === 0) {
        dispatch(followAC(userId))
    }
    dispatch(toggleProgresButtonAC(false, userId));
};

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 7,// кол-во пользователей на стр
    totalUsersCount: 0, //всего пользователей
    currentPage: 1,//какая страница
    isReady: true, //крутилка
    inProgresStatusUsers: [] as Array<number> //array of users id (1507 my id)
};

type InitialStateType = typeof initialState;
//   REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER
const usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followStatus: false
                        }
                    }
                    return u
                })
            }
        }

        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {
                            ...u,
                            followStatus: true
                        }
                    }
                    return u
                })
            };

        }

        case GET_USERS: {
            return {
                ...state,
                users: action.users
            };

        }

        case PAGE_CHANGE: {

            return {
                ...state,
                currentPage: action.page
            };

        }

        case TOTAL_USER_COUNT_CHANGE: {

            return {
                ...state,
                totalUsersCount: action.number
            };

        }

        case TOGGLE_SWITCH: {

            return {
                ...state,
                isReady: action.loadStatus
            };

        }

        case TOGGLE_PROGRES_BUTTON: {
            return {
                ...state,
                inProgresStatusUsers: action.progresStatus
                    ? [...state.inProgresStatusUsers, action.id]
                    : state.inProgresStatusUsers.filter(id => id !== action.id)


            };
        }

        default: {
            return state
        }

    }
};


export default usersReducer;
