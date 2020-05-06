import {usersAPI} from "../api/api";
import {UsersExtendedType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {InferReturnType} from "./redux-store";

type ActionTypes = InferReturnType<typeof actions>

export const actions = {
    unFollowAC: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    followAC: (userId: number) => ({type: 'FOLLOW', userId: userId} as const),
    getUsersAC: (user: Array<UsersExtendedType>) => ({type: 'GET_USERS', users: user} as const),
    getPageAC: (page: number) => ({type: 'PAGE_CHANGE', page} as const),
    getTotalUsersAC: (number: number) => ({type: 'TOTAL_USER_COUNT_CHANGE', number}as const),
    toggleSwitchAC: (status: boolean) => ({type: 'TOGGLE_SWITCH', loadStatus: status} as const),
    toggleProgresButtonAC: (progresStatus: boolean, id: number) => ({type: 'TOGGLE_PROGRES_BUTTON',progresStatus,id}as const) ,
}


//   THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK

export const unFollow = (userId: number): ThunkAction<Promise<void>, InitialStateType, unknown, ActionTypes> =>
    async (dispatch) => {
        dispatch(actions.toggleProgresButtonAC(true, userId))
        let response = await usersAPI.unFollow(userId)
        if (response.resultCode === 0) {
            dispatch(actions.unFollowAC(userId))
        }
        dispatch(actions.toggleProgresButtonAC(false, userId));
    };

export const getUsers = (pageSize: number, currentPage: number) =>
    async (dispatch: Dispatch<ActionTypes>) => {
        dispatch(actions.getPageAC(currentPage))
        dispatch(actions.toggleSwitchAC(true))
        let response = await usersAPI.getUsers(pageSize, currentPage)
        dispatch(actions.toggleSwitchAC(false))
        dispatch(actions.getUsersAC(response.items))
        dispatch(actions.getTotalUsersAC(response.totalCount))
    };

export const follow = (userId: n umber): ThunkAction<Promise<void>, InitialStateType, unknown, ActionTypes> =>
    async (dispatch) => {
        dispatch(actions.toggleProgresButtonAC(true, userId))
        let response = await usersAPI.follow(userId)
        if (response.resultCode === 0) {
            dispatch(actions.followAC(userId))
        }
        dispatch(actions.toggleProgresButtonAC(false, userId));
    };

let initialState = {
    users: [] as Array<UsersExtendedType>,
    pageSize: 7,// кол-во пользователей на стр
    totalUsersCount: 0, //всего пользователей
    currentPage: 1,//какая страница
    isReady: true, //крутилка
    inProgresStatusUsers: [] as Array<number> //array of users id (1507 my id)
};
type InitialStateType = typeof initialState;


//   REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER
const usersReducer = (state = initialState, action:ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'UNFOLLOW':
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
        case 'FOLLOW':
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
        case "GET_USERS":
            return {
                ...state,
                users: action.users
            };
        case 'PAGE_CHANGE': {
            return {
                ...state,
                currentPage: action.page
            };
        }
        case 'TOTAL_USER_COUNT_CHANGE': {
            return {
                ...state,
                totalUsersCount: action.number
            };
        }
        case 'TOGGLE_SWITCH': {
            return {
                ...state,
                isReady: action.loadStatus
            };
        }
        case 'TOGGLE_PROGRES_BUTTON': {
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
