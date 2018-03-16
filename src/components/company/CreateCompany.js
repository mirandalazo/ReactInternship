import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import {
    withStyles
} from 'material-ui/styles';
import Input,{InputLabel} from 'material-ui/Input';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import * as companyActions from "../../actions/company";
import {connect} from "react-redux";

const styles =  {
   formCreate:{
       display: 'flex-box',
    flexWrap: 'wrap',
       position:'relative'
   },
    formItem:{
        display:'block',
        marginTop:40
    },
    formLbl:{
        position:'relative',
        marginRight:20,
        top:40,
        fontWeight:'bold',
        fontSize:20
       
    },
    item:{
        display:'inline'
    },
    role:{
        marginBottom:60
    },
    btn:{
        marginTop:50,
        marginBottom:100,
        borderWidth:2,
        backgroundColor:"rgb(152, 238, 153)",
        borderRadius:5
    },
    formular:{
        height:'auto',
        width:'40%',
        backgroundColor:'#e1f5fe',
        borderRadius:10,
        position:'relative',
        margin:'auto',
        marginTop:40,
    }
};

const CreateCompany= (props)=> {
    
    const {classes}=props;
    var company={name:'', userId:''};

    function onSubmit() {
        props.createCompany(company);
    }
    
     return(
          <MuiThemeProvider >
            <div style={styles.formular}>
                <form style={styles.formCreate} autoComplete="off">
                    <InputLabel htmlFor="name-simple" style={styles.formLbl}>Company name</InputLabel>
                     <TextField
                         classes={{root: classes.formItem}}
                         id="name"
                         onChange={(event)=>company.name=event.target.value}
                         margin="normal"
                     />
                    <Button color="primary" classes={{root:classes.btn}} onClick={onSubmit}>
                         Create
                    </Button>
                </form>
            </div>
        </MuiThemeProvider>
    );
};
const mapDispatchToProps = (dispatch) => ({
    createCompany: (company) => dispatch(companyActions.createCompany(company)),
});

export default connect(null,mapDispatchToProps)(withStyles(styles)(CreateCompany));