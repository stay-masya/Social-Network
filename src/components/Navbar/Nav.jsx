import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";


const Nav = () => {
    return (
        <div className={s.nav}>

            < div className={s.item}>

                <NavLink activeClassName={s.active} to="/profile">Profile</NavLink>
            </div>

            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/users">Friends</NavLink>

            </div>

            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/messages">Messages</NavLink>
            </div>

            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/news">News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/settings">Settings</NavLink>
            </div>
        </div>
    );
}
export default Nav