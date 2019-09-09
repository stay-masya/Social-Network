import profileReducer from "./Profile-reduser";
import dialogReducer from "./Dialogs-reduser";


let store = {

    _state: {

        profile: {
            posts: [
                {id: 1, info: "Hello,it`s me))", like: 3},
                {id: 2, info: "lol,i can do it!!!!:)", like: 99},

            ],

            textareaPosts: 'profile__'
        },


        dialog: {


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

            textareaMessage: ':)'
        }

    },

    _renderTree() {
        console.log('info')
    },

    subscribe(observer) {

        this._renderTree = observer;
    },

    getState() {
        return this._state
    },


    dispatch(action) {


       this._state.profile = profileReducer(this._state.profile,action)  /*Post*/
       this._state.dialog = dialogReducer(this._state.dialog,action)  /*DIALOGS*/


        this._renderTree(this._state);
    }

};

window.state = store._state;


export default store;

