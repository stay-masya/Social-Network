import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reduser";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";


let mapStateToProps = (state) => {
    return {

        profile: state.profile
    }

}

let mapDispatchToProps = (dispatch) => {
    return {


        updateNewPostText: (text) => {

            dispatch(updateNewPostTextActionCreator(text));
        },

        onAddPost: () => {
            dispatch(addPostActionCreator());
        }

    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;
