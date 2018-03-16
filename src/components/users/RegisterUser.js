import React from 'react';
import {
    withStyles
} from 'material-ui/styles';
import {connect} from "react-redux";
import Input,{InputLabel} from 'material-ui/Input';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import * as userActions from '../../actions/user';

const styles={
    formbox:{
        display:'flex-wrap',
        position:'relative',
        align:'center',
        margin:'auto',
        marginTop:200,
        backgroundColor:'#e1f5fe',
        borderRadius:3,
        minHeight:300,
        width:'60%',

    },
    formItem:{
        display:'block'
    },
    btn:{
        marginTop:50,
        marginBottom:10,
        backgroundColor:'#5f5fc4',
        color:'white'
    },
    title:{
        paddingTop:20
    }
};

const RegisterUser=(props)=>{
    const {classes}=props;
    let user={username:'', firstName:'', lastName:'',password:'', userRoleId:''};

    function onSubmit(){
        props.regUser(user);
        console.log(user);
    }

    return(
        <div>
            <div style={styles.formbox}>
                <h2 style={styles.title}>Register</h2>
                <form>
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
                    <Button color="primary" classes={{root:classes.btn}} onClick={onSubmit}>
                        REGISTER
                    </Button>
                </form>
            </div>
        </div>
    )
};

const mapDispatchToProps=(dispatch)=>({
    regUser:(user)=> dispatch(userActions.regUser(user))
});

export default connect(null,mapDispatchToProps)(withStyles(styles)(RegisterUser));