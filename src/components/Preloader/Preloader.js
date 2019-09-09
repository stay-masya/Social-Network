import React from 'react';
import preloader from "../../Addition/Preloader/UnitedSmartBinturong-small.gif";
import s from './Preloader.module.css'



let Preloader = ()=>{

    return(
        <div> <img className={s.circleLoading} src={preloader} /></div>
    )
};


export default Preloader;