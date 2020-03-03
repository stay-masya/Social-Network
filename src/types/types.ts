export type PostsType = {
    id:number
    info:string
    like:number
}
export type ContactsType={
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType={
    small: string | null
    large: string | null
}
export type ProfilePageType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts:ContactsType
    photos:PhotosType
}
export type UsersType={
    id: number
    name: string
    status: string
}
