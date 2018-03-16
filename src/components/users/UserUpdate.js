import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import {
    withStyles
} from 'material-ui/styles';
import Dialog, {
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {connect} from "react-redux";
import * as userActions from "../../actions/user";

const styles =  {
    formCreate:{
        display: 'flex-wrap',
        minWidth:300,
        align:'center',
        position:'relative',
        margin:"auto"
    },
    formItem:{
        display:'block',
        marginBottom:10,
        position:'relative',
        align:'center',
        margin:'auto',
        marginLeft:30
    },
    formLabel:{
        position:'relative',
        marginRight:20
    },
    item:{
        display:'inline'
    },
    role:{
        marginBottom:60,
        color:'grey',
        marginLeft:30
    },
    btn:{
        marginTop:50,
        marginLeft:30
    }
};

const UserUpdate=(props)=> {
    const {classes} = props;

    function putUser(userEdit) {
        props.updateUser(userEdit);
        props.closeAfter();
    }

    return(
        <MuiThemeProvider >
            <Dialog open='true' classes={{root: classes.dialog}}>
                <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
                <form style={styles.formCreate} autoComplete="off">
                    <TextField
                        classes={{root: classes.formItem}}
                        label="Username"
                        id="name"
                        onChange={(event)=>props.userEdit.username=event.target.value}
                        margin="normal"
                        defaultValue={props.userEdit.username}
                    />
                    <TextField
                        classes={{root: classes.formItem}}
                        label="FirstName"
                        id="name"
                        onChange={(event)=>props.userEdit.firstName=event.target.value}
                        margin="normal"
                        defaultValue={props.userEdit.firstName}
                    />
                    <TextField
                        classes={{root: classes.formItem}}
                        label="LastName"
                        id="name"
                        onChange={(event)=>props.userEdit.lastName=event.target.value}
                        margin="normal"
                        defaultValue={props.userEdit.lastName}
                    />

                    <TextField
                        classes={{root: classes.formItem}}
                        label="Password"
                        id="name"
                        onChange={(event)=>props.userEdit.password=event.target.value}
                        margin="normal"
                        defaultValue={props.userEdit.password}
                    />
                    <div classes={{root:classes.role}} >
                        <label style={styles.role}>Role &nbsp; &nbsp;</label>
                        <select
                            defaultValue={props.userEdit.userRoleId}
                            onChange={(event)=>{props.userEdit.userRoleId=event.target.value}}  >
                            <option value='1'  >1-Admin</option>
                            <option value='2' >2-Company user</option>
                            <option value='3' >3-Simple user</option>
                        </select>
                    </div>
                    <Button color="primary" classes={{root:classes.btn}} onClick={()=>putUser(props.userEdit)} >
                        Update
                    </Button>
                    <Button color="primary" classes={{root:classes.btn}} onClick={props.closeUpdate}>
                        Cancel
                    </Button>
                </form>
            </Dialog>

        </MuiThemeProvider>
    )
};

const mapStateToProps = (state) => ({
    userEdit: state.user.userEdit,
});
const mapDispatchToProps=(dispatch)=>({
    updateUser:(userEdit)=> dispatch(userActions.updateUser(userEdit)),
});
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UserUpdate));