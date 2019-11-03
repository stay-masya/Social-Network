import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) =>{
    return(
        <div className={s.header}>

            <img src="http://tell-different.com/images/icons/icon-logo.png" alt=""/>
            <div className={s.loginStatus}>
                {
                    props.isAuth
                        ?<div>
                            {props.login}- <button onClick={props.logout}>Log out</button>
                        </div>
                        :<NavLink to={'/login'}>login</NavLink>
                }

            </div>
        </div>
    );
}
export default Header