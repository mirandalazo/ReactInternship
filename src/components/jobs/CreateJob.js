import React from 'react';
import {
    withStyles
} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {connect} from "react-redux";
import * as jobActions from "../../actions/job";
import { Field, FieldArray, reduxForm } from 'redux-form';


const styles = {
      formCreate:{
       display: 'flex-box',
       flexWrap: 'wrap',
       position:"relative",
        align:"center",
        margin:"auto",
          paddingLeft:150
        
   },
    formItem:{
        display:'block',
        align:'center',
        margin:'auto',
        marginBottom:20,
        height:25,
        border:' 1px solid #ccc',
        borderRadius:4,
        width:'60%'
    },
    formLabel:{
        position:'relative',
        marginRight:20
       
    },
    btn:{
        marginTop:50,
        marginBottom:20,
        width:'40%'

    },
    formBox:{
        height:'auto',
        width:'40%',
        backgroundColor:'#e1f5fe',
        borderRadius:10,
        position:'relative',
        align:"center",
        margin:'auto',
        marginTop:100,
        marginBottom:100,

},
    selectJob:{
        display:'block',
        marginTop:25
    },
    comp:{
        paddingRight:37,
        borderRadius:4,
        height:25,
        width:'60%',
        display:"block",
        position:"relative",
        margin:"auto",
        marginTop:15,
        marginBottom:20
    },
    create:{
        backgroundColor:"rgb(152, 238, 153)",
        borderRadius:5,
        marginRight:10
    },
    btnAdd:{
        backgroundColor:'#98ee99',
        borderRadius:5,

    },
    btnDetail:{
          width:'40%',
        backgroundColor:'#5f5fc4',
        borderRadius:4,
        marginTop:10,
        marginBottom:10,
        color:'white',
        borderColor:'#5f5fc4',
        minHeight:40,
        opacity:0.8
    },
    reqAdd:{
        listStyle:'none'
    },
    reqList:{
          listStyle:'none',
        display:'inline-flex',
        marginTop:10
    },
    btnRemove:{
          marginLeft:10,
        backgroundColor:'#ba6b6c',
        borderRadius:30,
        color:'white'
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

const renderReq = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul>
        <li style={styles.reqAdd}>
            <button style={styles.btnDetail} type="button" onClick={() => fields.push({})}>ADD REQUIREMENT</button>
            {(touched || submitFailed) && error && <span>{error}</span>}
        </li>
        {fields.map((req, index) => (
            <li key={index} style={styles.reqList}>
                <Field
                    name={`${req}.name`}
                    type="text"
                    component={renderField}
                />
                <button
                    style={styles.btnRemove}
                    type="button"
                    title="Remove Requirement"
                    onClick={() => fields.remove(index)}
                >X
                </button>
            </li>
        ))}
    </ul>
);

const renderBenefit = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul>
        <li style={styles.reqAdd}>
            <button style={styles.btnDetail} type="button" onClick={() => fields.push({})}>ADD BENEFIT</button>
            {(touched || submitFailed) && error && <span>{error}</span>}
        </li>
        {fields.map((req, index) => (
            <li key={index} style={styles.reqList}>
                <Field
                    name={`${req}.name`}
                    type="text"
                    component={renderField}
                />
                <button
                    style={styles.btnRemove}
                    type="button"
                    title="Remove Requirement"
                    onClick={() => fields.remove(index)}
                >X
                </button>
            </li>
        ))}
    </ul>
);

const CreateJob = props => {
    const {classes,show,handleSubmit,submitting} = props;
    var job={name:'', description:'',isAvailable:Boolean,companyId:''};

    return(
        <div style={styles.formCreate}>
            <Button style={styles.btnAdd} onClick={props.showForm}>Add Job</Button>
            <div style={styles.formBox} hidden={show}>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="name"
                        type="text"
                        component={renderField}
                        label="Name"
                    />
                    <Field
                        name="description"
                        type="text"
                        component={renderField}
                        label="Description"
                    />
                    { props.companies && props.companies.length && (
                        <div>
                            <label>Company</label>
                            <div>
                                <Field name="companyId" component="select"
                                       defaultValue={job.companyId=props.companies[0].id}  label="Company">
                                    {props.companies.map(comp => (
                                        <option value={comp.id} key={comp.id}>
                                            {comp.name}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                        </div>
                    )}

                    <FieldArray name="jobReqList" component={renderReq} />
                    <FieldArray name="jobBenefList" component={renderBenefit} />
                    <div>
                        <Button color="primary" classes={{root:classes.btn}} style={styles.create} type="submit" disabled={submitting} onClick={props.hide}>
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
   companies:state.company.companyInfoList,
});
const mapDispatchToProps = (dispatch) => ({
    checkAv:(job) => dispatch(jobActions.checkAv(job))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps)(CreateJob);
const withStyle = withStyles(styles)(withConnect);

export default reduxForm({
    form: 'createJobForm',
    enableReinitialize: true,
})(withStyle);
