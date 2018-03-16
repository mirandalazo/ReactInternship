import React from 'react';
import {
    withStyles
} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import { MuiThemeProvider} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import * as userActions from '../actions/user';
import {Link} from 'react-router-dom';
import {push } from 'react-router-redux'

const styles ={
    root: {
        flexGrow:1,
        display:'flex-box',
        flexWrap:'wrap'
    },
    toolbar:{
        textDecoration:'bold',
        display:'flex',
         textAlign:'right',
        backgroundColor:'#5f5fc4',
        textDecoration:'none',
        position:'fixed',
        width:'100%',
        zIndex:999
    },
    button:{
        textDecoration:'none',
        color:'#e1f5fe',
    },
    btnLog:{
    left:' 50%'
},
    logout:{
        position:' realtive',
        left:' 55%'
    },
    avatar:{
        width:' 7%',
        height:" 7%"
    }
};

const Navbar = (props) => {
        const {
        classes,
    } = props;

    function onLogout(){
        props.handleLogout();
        props.goToHome();
    }
    
    return(
        <MuiThemeProvider>             
            <div className={classes.root} >
                <AppBar color = "default" >
                <Toolbar classes={{root:classes.toolbar}}>
                 <Avatar alt="Logo" src="jobs-in-Oklahoma.png" style={styles.avatar} />

                    < Button  color = "inherit" classes={{root: classes.button}} component={Link} to='/'> Home </Button>
                    {(props.user && props.user.userRoleId==1)?<Button  color = "inherit"  classes={{root: classes.button}} component={Link} to='/users' > Users </Button>:null}
                    {(props.user && props.user.userRoleId==2)?<Button  color = "inherit"  classes={{root: classes.button}} component={Link} to='/companies'> Companies </Button> : null}
                    {(props.user && props.user.userRoleId==3)? < Button  color = "inherit" classes={{root: classes.button}} component={Link} to='/alljobs'> Jobs </Button> : null}
                    {(props.user && props.user.userRoleId==3)? <Button color = "inherit" classes={{root: classes.button}} component={Link} to='/profile'>Profile</Button>:null}
                    {props.user ? null : <Button color = "inherit"  style={styles.btnLog} classes={{root: classes.button}} onClick = { props.onLoginClick } > Login</Button>}
                    {props.user ?  <Button  color = "inherit" style={styles.logout} classes={{root: classes.button}} onClick={onLogout}>Logout </Button> : null}
                    {props.user ? null : <Button color = "inherit"  style={styles.btnLog} classes={{root: classes.button}} component={Link} to='/register'> Register</Button>}
                </Toolbar>
                </AppBar>
            </div>
        </MuiThemeProvider>
    );
};

const mapDispatchToProps = (dispatch) => {
  return {
      handleLogout: () => dispatch(userActions.handleLogout()),
      goToHome:()=> dispatch(push('/'))
  };
};

const mapStateToProps=(state)=>({
    user:state.user.user,
});
const styledNav=  withStyles(styles)(Navbar);
const withConnect = connect(mapStateToProps, mapDispatchToProps)(styledNav);
export default withConnect;

