import React from 'react';
import Header from "./Heades";
import {connect} from "react-redux";
import {setUserData, setUserLoginData} from "../../redux/Auth-reduser";


class HeaderContainer extends React.Component{

    componentDidMount() {
        this.props.setUserLoginData()
    }

    render() {
        return(
            <Header {...this.props}
                    isAuth={this.props.isAuth}
                    login={this.props.login}/>
        );
    }
}
let mapStateToProps = (state)=>{
    return{
    isAuth : state.auth.isAuth,
        login : state.auth.login
    }
};

export default connect(mapStateToProps,{setUserData,setUserLoginData})(HeaderContainer)