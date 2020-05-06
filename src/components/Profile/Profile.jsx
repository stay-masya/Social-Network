import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./My Post/MyPostsContainer";


const Profile = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo profilePage={props.profilePage}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    );
}

export default Profile
