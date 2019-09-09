import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const GET_USERS = 'GET-USERS'
const PAGE_CHANGE = 'PAGE-CHANGE'
const TOTAL_USER_COUNT_CHANGE = 'TOTAL_USER_COUNT_CHANGE'
const TOGGLE_SWITCH = 'TOGGLE_SWITCH'
const TOGGLE_PROGRES_BUTTON = 'TOGGLE_PROGRES_BUTTON'


export const unFollowAC = (userId) => {
    return {
        type : UNFOLLOW,
        userId :userId

    }
};

export const followAC = (userId) => {
    return {
        type : FOLLOW ,
        userId :userId
    }

};

export const getUsersAC = (user) => {
    return {
        type: GET_USERS,
        users: user
    };
};

export const getPageAC = (page) => {
    return {
        type: PAGE_CHANGE,
        page: page
    };
};

export const getTotalUsersAC = (number) => {

    return {
        type: TOTAL_USER_COUNT_CHANGE,
        number: number
    };
};

export const toggleSwitchAC = (status) => {

    return {
        type: TOGGLE_SWITCH,
        loadStatus: status
    };
};

export const toggleProgresButtonAC = (progresStatus,id) => {

    return {
        type: TOGGLE_PROGRES_BUTTON,
        progresStatus,
        id
    };
};

export const getUsers = (pageSize,currentPage) =>{
    return (dispatch) => {

        dispatch(getPageAC(currentPage))
        dispatch( toggleSwitchAC(true))
        usersAPI.getUsers(pageSize,currentPage)
            .then(response =>{
                dispatch(toggleSwitchAC(false))
                dispatch(getUsersAC(response.items))
                dispatch(getTotalUsersAC(response.totalCount))
            })
    };

};


//   THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK    THUNK

export const unFollow = (userId) =>{
    return (dispatch) => {
        dispatch(toggleProgresButtonAC(true,userId))
        usersAPI.unFollow(userId)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(unFollowAC(userId))
                }
                dispatch(toggleProgresButtonAC(false,userId));
            })
    };

};

export const follow = (userId) =>{
    return (dispatch) => {
        dispatch(toggleProgresButtonAC(true,userId))
        usersAPI.follow(userId)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(followAC(userId))
                }
                dispatch(toggleProgresButtonAC(false,userId));
            })
    };

};




let initialState = {
    users: [],
    pageSize : 7,// кол-во пользователей на стр
    totalUsersCount : 0, //всего пользователей
    currentPage : 1 ,//какая страница
    isReady : true, //крутилка
    inProgresStatusUsers: [] //массив прогрессии подписки (1507 my id)

};

//   REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER    REDUCER
const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case UNFOLLOW: {
            return {
                ...state,
                users : state.users.map(u =>{
                    if (u.id === action.userId){
                        return {...u,
                            followStatus : false}
                    }
                    return u
                })
            }
        }

        case FOLLOW: {
            return {...state,
                users : state.users.map(u =>{
                    if (u.id === action.userId){
                        return {...u,
                            followStatus : true}
                    }
                    return u
                })};

        }

        case GET_USERS: {
            return {...state,
                users: action.users
                };

        }

        case PAGE_CHANGE: {

            return {...state,
                currentPage: action.page
            };

        }

        case TOTAL_USER_COUNT_CHANGE: {

            return {...state,
                totalUsersCount: action.number
            };

        }

        case TOGGLE_SWITCH: {

            return {...state,
                isReady: action.loadStatus
            };

        }

        case TOGGLE_PROGRES_BUTTON: {
            return {...state,
                inProgresStatusUsers : action.progresStatus
                    ?[...state.inProgresStatusUsers, action.id]
                    :state.inProgresStatusUsers.filter(id=> id !==action.id)


            };
        }

        default: {
            return state
        }

    }
};






export default usersReducer;