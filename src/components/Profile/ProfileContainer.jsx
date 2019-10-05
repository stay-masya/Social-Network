import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {getStatus, getUserProfile, SetUserProfile, updateStatus} from "../../redux/Profile-reduser";
import {withRouter} from "react-router-dom";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId=this.props.match.params.userId;
        if (!userId)userId=1507

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }



    render() {
        return (
            <Profile {...this.props}
                     profilePage={this.props.profilePage}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        );
    }
}

let mapStateToProps = (state)=>{

    return {
        status : state.profile.status,
        profilePage: state.profile.profilePage
    };
};
let ProfileContainerWithRouter= withRouter(ProfileContainer)
export default connect(mapStateToProps,{
    getUserProfile,
    getStatus,
    updateStatus
})(ProfileContainerWithRouter)
