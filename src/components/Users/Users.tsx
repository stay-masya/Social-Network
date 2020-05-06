import React from 'react';
import s from './Users.module.css'
import avaIcon from '../../Addition/Img/user.png'
import {NavLink} from "react-router-dom";
import {UsersExtendedType} from "../../types/types";


type UserTypes={
    totalUsersCount : number
    pageSize : number
    currentPage : number
    onPageSelect : (p:number)=>void
    users : Array<UsersExtendedType>
    inProgresStatusUsers : Array<number>
    unFollow :(userId:number)=>void
    follow :(userId:number)=>void
}

let Users:React.FC<UserTypes> = ({totalUsersCount,pageSize,onPageSelect,users,currentPage,...props}) => {
    let pageNumber = Math.ceil(totalUsersCount / pageSize);
    let pageCounter = [];
    for (let i = 1; i <= pageNumber; i++) {
        pageCounter.push(i);
    }
    return (
        <div>
            <div>
                {
                    pageCounter.map(p => {
                        return <span onClick={() => {
                            onPageSelect(p)
                        }} className={currentPage === p ? s.selectPageA : s.selectPage}>{p}</span>
                    })
                }
            </div>
            {
                users.map(u => <div key={u.id} className={s.fiendsItem}>
                    <div className={s.photo}>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small !== null ? u.photos.small : avaIcon} alt=""/>
                        </NavLink>
                        <div>
                            {
                                u.followStatus
                                    ? <button disabled={props.inProgresStatusUsers.some(id=> id==u.id)} onClick={() => {

                                        props.unFollow(u.id)

                                    }}>Unfollow</button>
                                    : <button disabled={props.inProgresStatusUsers.some(id=> id==u.id)} onClick={() => {

                                        props.follow(u.id)

                                    }}>Follow</button>
                            }
                        </div>
                    </div>
                    <div className={s.aboutUser}>
                        <div>{u.name}</div>
                        <div>
                            <div>{'u.residencePlace.country'}</div>
                            <div>{'u.residencePlace.city'}</div>
                        </div>
                        <div>{u.status}</div>
                    </div>

                </div>)
            }
            <button>Get more</button>
        </div>)
};


export default Users
