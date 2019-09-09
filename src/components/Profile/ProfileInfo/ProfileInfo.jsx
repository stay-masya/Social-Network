import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Preloader/Preloader";
import LargeAvaIcon from './../../../Addition/Img/userlarge.jpg'


const ProfileInfo = (props) => {

    if (!props.profilePage){
        return <Preloader/>
    }
    return (
        <div>
           <div className={s.profilePage}>
               <div className={s.profilePhotos}>
                   <img  src={props.profilePage.photos.large
                       ?props.profilePage.photos.large
                       :LargeAvaIcon} />
               </div>


               <div className={s.profileDescription}>
                   <div>{props.profilePage.fullName}</div>
                   <div>long story shot : {props.profilePage.aboutMe}</div>
                   <div>looking for work : {!props.profilePage.lookingForAJob? 'Actively looking':'Already working' }</div>
               </div>
           </div>
        </div>


    );
}
export default ProfileInfo