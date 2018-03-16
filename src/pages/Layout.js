import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import Homepage from '../components/Homepage';
import Users from './Users';
import Companies from './Companies';
import AllJobs from './SimpleUserJobs';
import CompanyDetails from './CompanyDetails';
import JobDetails from './JobDetails';
import CompanyJob from './CompanyJob';
import Profile from './Profile';
import RegisterUser from '../components/users/RegisterUser';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';

import { Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../actions/user';

const theme = createMuiTheme({
 palette: {
    primary: indigo
 }
});


const ConnectedSwitch = connect(state => ({
    location: state.router.location
}))(Switch);

class Layout extends Component{
    state={ 
        username:'',
        password:'',
      openLogin: false,
        userId:null,
        };

    handleLogin = () => {
        this.setState({
            openLogin: true
        })
    };
    
    closeLogin = () => {
        this.setState({
           openLogin: false
        });
    };
    
    componentDidMount(){
        this.props.onInit();
    };

    render() {
        return(
            
            <MuiThemeProvider theme={theme}>
            <div>
             <Navbar onLoginClick = {this.handleLogin}/>
             { this.state.openLogin ? < div > < Login onClose={this.closeLogin} onClick={ this.closeLogin }/></div> : null }
                <br />
                <br />
                <br />
            
             <ConnectedSwitch>
                 {(this.props.user && this.props.user.userRoleId==2)? <Route exact path="/companies" component={Companies}/> : null}
                 {(this.props.user && this.props.user.userRoleId==1)?<Route exact path="/users" component={Users}/> : null}
                 <Route exact path="/" component={Homepage} />
                 {(this.props.user && this.props.user.userRoleId==2)? <Route path='/companies/:id' component={CompanyDetails}/> : null}
                 {(this.props.user && this.props.user.userRoleId==2)? <Route exact path='/jobDetail' component={CompanyJob}/> : null}
                 {(this.props.user && this.props.user.userRoleId==3)?<Route exact path='/alljobs' component={AllJobs}/> : null}
                 {(this.props.user && this.props.user.userRoleId==3)?<Route path='/alljobs/:jobid' component={JobDetails}/> : null}
                 {(this.props.user && this.props.user.userRoleId==3)?<Route path='/profile' component={Profile}/> : null}
                 {(this.props.user) ? null : <Route exact path='/register' component={RegisterUser}/> }
             </ConnectedSwitch>
           
            </div>
            </MuiThemeProvider>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    onInit:()=> dispatch(userActions.onAppInit()),
});
const mapStateToProps=(state)=>({
    user:state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
