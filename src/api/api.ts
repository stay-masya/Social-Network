import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    headers: {'API-KEY': '2477fc6d-9f93-4176-aec6-48230d2a3d57'},
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true

})

export const usersAPI = {
    createPost(props : any) {
        return axios.post(`http://bloggy-api.herokuapp.com/posts`, {props})
            .then(response => console.log(response))
    },
    getUsers(pageSize:number, currentPage:number) {
        return instance.get(`/users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    follow(id:number) {
        return instance.post(`/follow/${id}`)
            .then(response => response.data)
    },
    unFollow(id:number) {
        return instance.delete(`/follow/${id}`)
            .then(response => response.data)
    },
};

export enum ResultCodeEnum{
    Success=0,
    Error=1
}

type MeResponseType={
    resultCode: ResultCodeEnum
    messages: Array<any>
    data: {
        id: number
        email: string
        login: string
    }
}
export const headerAPI = {
    setUserLoginData() {
        return instance.get<MeResponseType>(`/auth/me`)
            .then(response => response.data)
    },
    login(email:string, password:string, rememberMe:boolean=false) {
        return instance.post(`/auth/login`, {email, password, rememberMe})
        .then(response => response.data)
    },
    logout() {
        return instance.delete(`/auth/login`)
        .then(response => response.data)
    }
};


export const profileAPI = {
    setUserPage(userId:number) {
        return instance.get(`/profile/${userId}`)
    },
    getStatus(userId:number) {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus(status:string) {
        return instance.put(`/profile/status/`, {status})
    }
};

// headerAPI.setUserLoginData().then((res:AxiosResponse<number>) =>res.data)
