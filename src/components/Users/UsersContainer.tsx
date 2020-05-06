import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {
    follow,
    getUsers,
    // toggleProgresButtonAC,
    unFollow,
} from '../../redux/Users-reduser';
import Preloader from "../Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {UsersExtendedType} from "../../types/types";


type MapStateType = {
    users: Array<UsersExtendedType>
    pageSize: number
    totalUsersCount: number,
    currentPage: number,
    isReady: boolean,
    inProgresStatusUsers: Array<number>
}
type MapDispatchType = {
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    // toggleProgresButton: (progresStatus: boolean, id: number) => void
    getUsers: (pageSize: number, currentPage: number) => void
}
type OwnPropsType = {
    onPageSelect: (p:number)=>void
}

type PropsType = MapStateType & MapDispatchType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {


    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage)
    }

    onPageSelect = (p:number) => {
        this.props.getUsers(this.props.pageSize, p)
    };


    render() {
        return <>
            {this.props.isReady
                ? <Preloader/>
                : null
            }

            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   onPageSelect={this.onPageSelect}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   // addFollowers={this.props.addFollowers}
                   inProgresStatusUsers={this.props.inProgresStatusUsers}
                   // toggleProgresButton={this.props.toggleProgresButton}
                   unFollow={this.props.unFollow}
                   follow={this.props.follow}/>
        </>
    }
}


let mapStateToProps = (state: AppStateType) : MapStateType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isReady: state.usersPage.isReady,
        inProgresStatusUsers: state.usersPage.inProgresStatusUsers
    }
};

export default connect <MapStateType,MapDispatchType,OwnPropsType,AppStateType>(mapStateToProps, {
    unFollow,
    follow,
    // toggleProgresButton: toggleProgresButtonAC,
    getUsers
})(UsersContainer);
