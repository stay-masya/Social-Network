const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';


export const addMessageActionCreator = () => {
    return {
        type: SEND_MESSAGE
    }
};

export const updateNewMessageTextActionCreator = (textMessageAlert) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT, newText: textMessageAlert
    }
};

let initialState={
        contacts: [
            {name: "Anna Smolyar", id: "Anya"},
            {name: "Danil Sorokin", id: "Danil"},
            {name: "Stekachev Valerii", id: "Valera"},
        ],

        messages: [
            {SendMessage: "Hello", id: 1},
            {SendMessage: "it`s me :)", id: 2},
            {SendMessage: "go play football", id: 3},
            {SendMessage: "YO!", id: 4},
        ],

        textareaMessage: ''
    };




const dialogReducer = (state=initialState, action) => {

    switch (action.type) {

        case UPDATE_NEW_MESSAGE_TEXT : {
            return  {
                ...state,
             textareaMessage : action.newText
             };
        }

        case SEND_MESSAGE: {

            return {
                ...state,
                textareaMessage : '',
                messages : [...state.messages,{id: 4, SendMessage: state.textareaMessage}]
            };
        }

        default : {
            return state
        }
    }
};

export default dialogReducer;
