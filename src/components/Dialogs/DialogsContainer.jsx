import React from 'react';
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/Dialogs-reduser";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        dialog: state.dialog
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextActionCreator(text));
        },
        onSendMessage: () => {
                dispatch(addMessageActionCreator())
        }
    }
};


    const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);


    export default DialogsContainer;
