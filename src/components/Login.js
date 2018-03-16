import React from 'react';
import {
    withStyles
} from 'material-ui/styles';
import Input, {
    InputLabel,
} from 'material-ui/Input';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogTitle,
} from 'material-ui/Dialog';
import { FormControl } from 'material-ui/Form';
import { MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import { connect } from 'react-redux';
import * as userActions from '../actions/user';

const theme = createMuiTheme({

});
 const styles = theme=>({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        position:'relative'
    },
     root: {
    display: 'flex',
    flexWrap: 'wrap',
         marginTop:100
  },
     formControl: {
        display:'block'
  },
    button: {
        margin: theme.spacing.unit,
        textDecoration:'none'
    },
         withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
    dialog:{
        width:600,
        verticalAlign:'middle',
       textAlign:'center',
        align:'center',
        float:'right'      
    }
 });


const Login = (props) => {
    var user={ username:'', password:''};
    
    const { classes,
          } = props;
    
    function handleLogin(){
        props.onLogin(user);
        props.onClose();
    }
    
        return(
        <MuiThemeProvider>
            <div style={styles.container}>
                <Dialog open="true" style={styles.dialog}
                  aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <div className={classes.root}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="username-simple">Username</InputLabel>
                  <Input  onChange={(event)=>user.username=event.target.value} id="username-simple" value={props.username} />
                </FormControl>
                <FormControl className={classes.formControl} >
                  <InputLabel htmlFor="pass-helper">Password</InputLabel>
                  <Input onChange={(event)=>user.password=event.target.value} id="pass-helper" value={props.password} type='password'/>
                </FormControl>
                 <DialogActions>
                    <Button onClick={handleLogin}  color="primary">
                       Login
                    </Button>
                    <Button onClick={props.onClose} color="primary">
                      Cancel
                    </Button>
                 </DialogActions>
                </div>
                </Dialog>
            </div>
        </MuiThemeProvider>
    );
};

const mapDispatchToProps = (dispatch) => {
  return {
      onLogin: (user) => dispatch(userActions.onLogin(user)),
  };
};


const styledLogin=  withStyles(styles)(Login);
const withConnect = connect(null, mapDispatchToProps)(styledLogin);
export default withConnect;