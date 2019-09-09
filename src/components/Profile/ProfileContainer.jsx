import React from 'react';
import {connect} from "react-redux";
import * as axios from "axios";
import Profile from "./Profile";
import {getUserProfile, SetUserProfile} from "../../redux/Profile-reduser";
import {withRouter} from "react-router-dom";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId=this.props.match.params.userId;
        if (!userId)userId=1507
        this.props.getUserProfile(userId)

    }

    render() {
        return (
            <Profile {...this.props} profilePage={this.props.profilePage} />
        );
    }
}

let mapStateToProps = (state)=>{
    return {

        profilePage: state.profile.profilePage
    };
};
let ProfileContainerWithRouter= withRouter(ProfileContainer)
export default connect(mapStateToProps,{getUserProfile})(ProfileContainerWithRouter)
