import * as axios from "axios";
import {setUserData} from "../redux/Auth-reduser";
import {setUserProfileAC} from "../redux/Profile-reduser";

const instance = axios.create({

    headers:{'API-KEY':'2477fc6d-9f93-4176-aec6-48230d2a3d57'},
    baseURL:'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true

})

export const usersAPI = {

    createPost(props) {
        return axios.post(`http://bloggy-api.herokuapp.com/posts`,{props})
            .then(response =>console.log(response))


    },


    getUsers(pageSize, currentPage) {
        return instance.get(`/users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)


    },
    follow(id) {
        return instance.post(`/follow/${id}`)
            .then(response => response.data)

    },
    unFollow(id) {
        return instance.delete(`/follow/${id}`)
            .then(response => response.data)

    },
};

export const headerAPI = {
        setUserLoginData (){
            return instance.get(`/auth/me`)
                .then(response => response.data)
        }
    };

export const profileAPI = {
    setUserPage(userId){
       return  instance.get(`/profile/${userId}`)
    },
    getStatus(userId){
        return  instance.get(`/profile/status/${userId}`)
    },
    updateStatus(status){
        return  instance.put(`/profile/status/`,{status})
    }

};






