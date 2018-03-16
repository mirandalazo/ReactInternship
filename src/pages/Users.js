import React, {Component} from 'react';
import CreateUser from '../components/users/CreateUser';
import { connect } from 'react-redux';
import * as userActions from "../actions/user";
import UserList from '../components/users/UserList';
import UserUpdate from '../components/users/UserUpdate';


class Users extends Component{
    state={
        userInfoList:[],
        openUpdate:false,
    };

    openUpdate=()=> {
        this.setState({
            openUpdate: true
        })
    };

    closeUpdate=()=> {
        this.setState({
            openUpdate: false
        })
    };
    componentDidMount(){
        this.props.getUsers();
    }

    render(){
        return(
            <div>
            <br />
            <br />
            <br />
                <h1>Users</h1>
                <CreateUser/>
                <UserList openUpdate={this.openUpdate}/>
                {this.state.openUpdate ? <UserUpdate closeUpdate={this.closeUpdate} closeAfter={this.closeUpdate} /> : null}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => dispatch(userActions.getUsers()),
});

export default connect(null, mapDispatchToProps)(Users);