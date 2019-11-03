import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Nav from './components/Navbar/Nav';
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeadesContainer";
import Login from "./components/login/Login";


const App = () => {

    return (

        <div className="app-wrapper">
            <HeaderContainer/>
            <Nav/>
            <div className="app-wrapper-content">
                <Route render={() => <ProfileContainer/>} path="/profile/:userId?"/>
                <Route render={() => <DialogsContainer/>} path="/messages"/>
                <Route render={() => <Settings/>} path="/settings"/>
                <Route render={() => <News/>} path="/news"/>
                <Route render={() => <UsersContainer/>} path="/users"/>
                <Route render={() => <Login/>} path="/login"/>

            </div>
        </div>
    );

}


export default App;
