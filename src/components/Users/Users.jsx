import React from 'react';
import s from './Users.module.css'
import avaIcon from '../../Addition/Img/user.png'
import {NavLink} from "react-router-dom";


let Users = (props) => {


    let pageNumber = Math.ceil(props.totalUsersCount / props.pageSize);

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
                            props.onPageSelect(p)
                        }} className={props.currentPage === p ? s.selectPageA : s.selectPage}>{p}</span>
                    })
                }
            </div>


            {

                props.users.map(u => <div key={u.id} className={s.fiendsItem}>
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
