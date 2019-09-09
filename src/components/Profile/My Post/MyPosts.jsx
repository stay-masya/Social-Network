import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reduser";



const MyPosts = (props) => {


    let postItem = props.profile.posts.map((p) => {
        return (

            <Post info={p.info} key={p.id} like={p.like}/>
        )
    });



    let upAreaValuePost = (e)=>{

        let text =e.target.value;
        props.updateNewPostText(text)

    };

    let onSendPost = ()=>{

        props.onAddPost();
    };


    return (
        <div className={s.myPosts}>

            <h3>My posts</h3>
            <div>
                <textarea onChange={upAreaValuePost}
                           value={props.profile.textareaPosts}
                />
            </div>
            <div>
                <button  onClick={onSendPost} >Add any</button>
            </div>

            <div className={s.posts}>

                {postItem}

            </div>
        </div>


    );
}

export default MyPosts