import React from 'react';
import s from './Post.module.css'


const Post = (props) => {
    return (
        <div className={s.item}>
            <img src="http://www.adm-mosrentgen.ru/wp-content/uploads/2017/07/%D0%BC%D0%B8%D0%BD%D1%8C%D0%BE%D0%BD%D1%8B-%D0%BF%D1%80%D0%B8%D0%BA%D0%BE%D0%BB%D1%8B-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8.jpg" alt="" />
            
                <div className={s.mes}>
                    Message: <span className={s.text}>{props.info}</span>
                </div>
                <div className={s.like}>
                    Like: <span>{props.like}</span>

                </div>
            
        </div>

    );
}
export default Post