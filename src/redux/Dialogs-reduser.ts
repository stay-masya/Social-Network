const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

type AddMessageActionCreatorType = {
    type: typeof SEND_MESSAGE
}
export const addMessageActionCreator = (): AddMessageActionCreatorType => {
    return {
        type: SEND_MESSAGE
    }
};

type UpdateNewMessageTextActionCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT
    newText: string
}
export const updateNewMessageTextActionCreator = (textMessageAlert: string): UpdateNewMessageTextActionCreatorType => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT, newText: textMessageAlert
    }
};

type ContactsType = {
    name: string
    id: string
}
type MessagesType = {
    SendMessage: string
    id: number
}
let initialState = {
    contacts: [
        {name: "Anna Smolyar", id: "Anya"},
        {name: "Danil Sorokin", id: "Danil"},
        {name: "Stekachev Valerii", id: "Valera"},
    ] as Array<ContactsType>,

    messages: [
        {SendMessage: "Hello", id: 1},
        {SendMessage: "it`s me :)", id: 2},
        {SendMessage: "go play football", id: 3},
        {SendMessage: "YO!", id: 4},
    ] as Array<MessagesType>,

    textareaMessage: ''
};


const dialogReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case UPDATE_NEW_MESSAGE_TEXT : {
            return {
                ...state,
                textareaMessage: action.newText
            };
        }

        case SEND_MESSAGE: {

            return {
                ...state,
                textareaMessage: '',
                messages: [...state.messages, {id: 4, SendMessage: state.textareaMessage}]
            };
        }

        default : {
            return state
        }
    }
};

export default dialogReducer;
