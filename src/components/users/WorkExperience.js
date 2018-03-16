import React from 'react';
import {
    withStyles
} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {connect} from "react-redux";
import { Field, FieldArray, reduxForm } from 'redux-form';
import moment from 'moment';


const styles={
    btnAddXp:{
        backgroundColor:'#98ee99',
        borderRadius:4,
    },
    formBox:{
        height:'auto',
        width:'90%',
        backgroundColor:'#e1f5fe',
        borderRadius:4,
        position:'relative',
        margin:'auto',
        marginTop:100,
        marginBottom:100,
    },
    create:{
        backgroundColor:"rgb(152, 238, 153)",
        borderRadius:5,
        marginRight:10
    },
    btn:{
        marginTop:50,
        marginBottom:20,
        width:'40%'
    },
    workList:{
        listStyle:'none',
        display:'block',
        marginTop:10
    },
    btnDetail:{
        width:'30%',
        backgroundColor:'#5f5fc4',
        borderRadius:4,
        marginTop:10,
        marginBottom:10,
        color:'white',
        borderColor:'#5f5fc4',
        opacity:0.9
    },
    reqAdd:{
        listStyle:'none'
    },
    btnRemove:{
        borderRadius:15,
        backgroundColor:'#ff7961',
        color:'white',
        borderColor:'#ff7961',
        marginTop:5
    },
    date:{
        margin:'auto',
        height:50
    }
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={label} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);

const renderDatePicker = ({input, type, label, placeholder, defaultValue, meta: {touched, error}, }) => (
    <div>
        <label>{label}</label>
        <input {...input}  type="date" dateForm="MM-DD-YYYY" selected={input.value ? moment(input.value) : null} />
        {touched && error && <span>{error}</span>}
    </div>
);

const renderWork = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul>
        <li style={styles.reqAdd}>
            <button style={styles.btnDetail} type="button" onClick={() => fields.push({})}>ADD WORK XP</button>
            {(touched || submitFailed) && error && <span>{error}</span>}
        </li>
        {fields.map((work, index) => (
            <li key={index} style={styles.workList}>
                <Field
                    name={`${work}.institution`}
                    type="text"
                    component={renderField}
                    label="Institution"
                />
                <Field
                    name={`${work}.description`}
                    type="text"
                    component={renderField}
                    label="Description"
                />
                <Field
                    name={`${work}.startDate`}
                    component={renderDatePicker}
                    label="Start Date"
                />
                <Field
                    name={`${work}.endDate`}
                    component={renderDatePicker}
                    label="End Date"
                />
                <button
                    variant="fab"
                    style={styles.btnRemove}
                    type="button"
                    title="Remove Requirement"
                    onClick={() => fields.remove(index)}
                >X
                </button>
                <hr></hr>
            </li>
        ))}
    </ul>
);

const WorkExperience =(props)=>{
    const {classes,show,handleSubmit,submitting, } = props;
    let work={userId:'',institution:'',description:'',startDate:'',endDate:''};

    return(
        <div>
            <Button style={styles.btnAddXp} onClick={props.showForm}>Add Work Experience</Button>
            <div style={styles.formBox} hidden={show}>
                <form onSubmit={handleSubmit}>
                    <FieldArray name="workxpList" component={renderWork} />

                    <div>
                        <Button color="primary" classes={{root:classes.btn}} style={styles.create} type="submit" disabled={submitting}>
                            Create
                        </Button>
                        <Button color="primary" classes={{root:classes.btn}} style={styles.create} onClick={props.hide}>
                            Close
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
user: state.user.user
});

const withConnect = connect(mapStateToProps,null)(WorkExperience);

const withStyle = withStyles(styles)(withConnect);

export default reduxForm({
    form: 'createWorkXPForm',
    enableReinitialize: true,
})(withStyle);
