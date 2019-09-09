import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";



const Dialog = (props) => {

    return (
        <div className={s.dialog}>
            <NavLink  activeClassName={s.active} to={"/messages/" + props.id}>{props.name}</NavLink>
        </div>

    )
};


const Message = (props) => {
    return (
        <div className={s.message}>
            {props.SendMessage}
        </div>

    )
};






const Dialogs = (props) => {
    debugger;


    let contactsItem = props.dialog.contacts.map( c => <Dialog name={c.name} key={c.id} id={c.id}/>);

    let messageItem = props.dialog.messages.map( m => <Message SendMessage={m.SendMessage} key={m.id} id={m.id} />);


    let upAreaValueMessage = (e)=>{

        let text =e.target.value;
        props.updateNewMessageText(text)

    }


    let onSendMessage = ()=>{

        props.onSendMessage();
        //props.dispatch(sendMessageActionCreator());

    };

    return (
        <div className={s.dialogs}>


            <div className={s.contacts}>
                {contactsItem}

            </div>

            <div className={s.messages}>
                {messageItem}

                <div>
                    <div>
                <textarea onChange={upAreaValueMessage}
                          value={props.dialog.textareaMessage} />
                    </div>
                    <div>
                        <button  onClick={onSendMessage} >Send...</button>
                    </div>

                </div>

            </div>


        </div>


    );


}


export default Dialogs
