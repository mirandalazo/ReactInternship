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
import * as companyActions from "../../actions/company";


const styles =  {
    formCreate:{
        display: 'flex',
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
        marginTop:50
    }
};

const CompanyUpdate=(props)=>{
    const {classes}=props;

    function putCompany(compEdit) {
        props.updateCompany(compEdit);
        props.closeAfter();
    }

    return(
        <MuiThemeProvider >
            <Dialog open='true' classes={{root: classes.dialog}}>
                <DialogTitle id="form-dialog-title">Edit company</DialogTitle>
                <form classes={{root: classes.formCreate}} autoComplete="on">
                    <TextField
                        label="Username"
                        classes={{root: classes.formItem}}
                        id="name"
                        onChange={(event)=>props.compEdit.name=event.target.value}
                        margin="normal"
                        defaultValue={props.compEdit.name}
                    />
                    <Button color="primary" classes={{root:classes.btn}}  onClick={()=>putCompany(props.compEdit)} >
                        Update
                    </Button>
                    <Button color="primary" classes={{root:classes.btn}} onClick={props.closeUpdate}>
                        Cancel
                    </Button>
                </form>
            </Dialog>
        </MuiThemeProvider>
    );
};
const mapStateToProps = (state) => ({
    compEdit: state.company.compEdit,
});
const mapDispatchToProps=(dispatch)=>({
    updateCompany:(compEdit)=> dispatch(companyActions.updateCompany(compEdit)),
});

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CompanyUpdate));