import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import {
    withStyles
} from 'material-ui/styles';
import Input,{InputLabel} from 'material-ui/Input';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as userActions from "../../actions/user";

const styles =   {
   formCreate:{
       display: 'flex-box',
    flexWrap: 'wrap',
   },
    formItem:{
        display:'block'
    },
    formLabel:{
        position:'relative',
        marginRight:20
       
    },
    item:{
        display:'inline'
    },
    role:{
        marginBottom:60
    },
    btn:{
        marginTop:50,
        marginBottom:10
    },
    formBox:{
        height:'auto',
        width:'40%',
        backgroundColor:'#e1f5fe',
        borderRadius:10,
        position:'relative',
        margin:'auto',
        marginBottom:50
}
};

const CreateUser= (props)=> {
    const {classes}=props;
    var user={username:'', firstName:'', lastName:'',password:'', userRoleId:''};
       
    function onSubmit(){
        props.createUser(user);
        console.log(user);
    }
    
    return(
           <MuiThemeProvider >
            <div style={styles.formBox}>
                <h2>Create user</h2>
                <form classes={{root: classes.formCreate}} autoComplete="off">

                     <InputLabel htmlFor="name-simple" classes={{root:classes.formLabel}}>Username</InputLabel>
                     <TextField
                          classes={{root: classes.formItem}}
                          id="name"
                          onChange={(event)=>user.username=event.target.value}
                          margin="normal"
                     />
                     <InputLabel htmlFor="name-simple" classes={{root:classes.formLabel}}>FirstName</InputLabel>
                     <TextField
                          classes={{root: classes.formItem}}
                          id="name"
                          onChange={(event)=>user.firstName=event.target.value}
                          margin="normal"
                      />
                      <InputLabel htmlFor="name-simple" classes={{root:classes.formLabel}}>LastName</InputLabel>
                      <TextField
                          classes={{root: classes.formItem}}
                          id="name"
                          onChange={(event)=>user.lastName=event.target.value}
                          margin="normal"
                      />
                      <InputLabel htmlFor="name-simple" classes={{root:classes.formLabel}}>Password</InputLabel>
                      <TextField
                          classes={{root: classes.formItem}}
                          id="name"
                          onChange={(event)=>user.password=event.target.value}
                          margin="normal"
                      />
                    <div classes={{root:classes.role}} >
                        <InputLabel htmlFor="name-simple" classes={{root:classes.formLabel}}>Role ID</InputLabel>
                         <select
                          onChange={(event)=>{user.userRoleId=event.target.value}}  >
                            <option value='1'  >1-Admin</option>
                            <option value='2' >2-Company user</option>
                            <option value='3' >3-Simple user</option>
                        </select>
                    </div>

                    <Button color="primary" classes={{root:classes.btn}} onClick={onSubmit}>
                     Create
                    </Button>
                    <Button color="primary" classes={{root:classes.btn}}>
                      Cancel
                    </Button>
                </form>
        </div>
        </MuiThemeProvider>
        )
};

const mapDispatchToProps = (dispatch) => ({
   createUser: (user) => dispatch(userActions.createUser(user)),
});
export default connect(null,mapDispatchToProps)(withStyles(styles)(CreateUser));
