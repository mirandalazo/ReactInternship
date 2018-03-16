import React from 'react';
import { MuiThemeProvider} from 'material-ui/styles';
import {
    withStyles
} from 'material-ui/styles';
import Dialog, {
    DialogTitle,
} from 'material-ui/Dialog';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import {connect} from "react-redux";
import * as jobActions from "../../actions/job";


const styles =  {
    formCreate:{
        display: 'flex-box',
        flexWrap: 'wrap',
        minWidth:400,
        minHeight:400

    },
    formItem:{
        display:'block',
        marginLeft:100,
        minWidth:320
    },
    formLabel:{
        position:'relative',
        marginRight:20,
        marginLeft:100

    },
    item:{
        display:'inline'
    },
    role:{
        marginBottom:60,
        marginLeft:100
    },
    btn:{
        marginTop:30,
        marginLeft:100
    },
    label:{
        marginLeft:100,
        color:'#3f51b5',
        marginTop:20
    },
    comp:{
        paddingRight:37,
        borderRadius:5,
        height:30,
        position:"relative",
        margin:"auto",
        marginTop:15,
        marginLeft:10
    },
    del:{
       float:'right',
        height:5,
        width:15,
        marginRight:30,
        marginTop:-30,
        backgroundColor:'#ff7961',
    }
};

const JobUpdate=(props)=>{
    const {classes,closeUpdate}=props;

    function putJob(jobEdit){
        props.updateJob(jobEdit);
        props.closeAfter();
    }

    function deleteReq(jobEdit,req,idx) {
        props.deleteReq(req);
        {
            jobEdit.jobReqList &&
            jobEdit.jobReqList.splice(idx, 1);
        }
    }

    function deleteBenefit(jobEdit,benef,idx) {
        props.deleteBenefit(benef);
        {
            jobEdit.jobBenefList &&
            jobEdit.jobBenefList.splice(idx,1);
        }
    }

    return(
        <MuiThemeProvider >
            <Dialog open='true' classes={{root: classes.dialog}}>
                <DialogTitle id="form-dialog-title">Edit job</DialogTitle>
                <form style={styles.formCreate}>
                    <TextField
                        label="Name"
                        classes={{root: classes.formItem}}
                        id="name"
                        onChange={(event)=>props.jobEdit.name=event.target.value}
                        margin="normal"
                        defaultValue={props.jobEdit.name}
                    />
                    <TextField
                        label="Description"
                        classes={{root: classes.formItem}}
                        id="multiline-flexible"
                        onChange={(event)=>props.jobEdit.description=event.target.value}
                        multiline
                        rowsMax="4"
                        margin="normal"
                        defaultValue={props.jobEdit.description}
                    />
                    <div style={styles.selectJob}>
                        <label style={styles.label}>Availability</label>
                        <Switch
                            onChange={(event)=>{props.jobEdit.isAvailable = event.target.checked}}
                            value={props.checkAv}
                        />
                    </div>
                    <div style={styles.selectJob}>
                       <label  style={styles.label}>Company name</label>
                        <select style={styles.comp}  defaultValue={props.jobEdit.companyId} onChange={(event)=>{props.jobEdit.companyId=event.target.value}}>
                            {props.companies.map(comp=> {
                                return (
                                    <option value={comp.id} key={comp.id}>{comp.name}</option>
                                )}
                            )
                            }
                        </select>
                    </div>
                    {props.jobEdit.jobReqList ?
                    (<div>
                        <label style={styles.label}>Requirements</label>
                        {props.jobEdit.jobReqList.map((req,idx)=> {
                            return (
                                <div>

                                <TextField
                                    classes={{root: classes.formItem}}
                                    id="req"
                                    onChange={(event)=>props.jobEdit.jobReqList[idx]=event.target.value}
                                    margin="normal"
                                    defaultValue={req.name}
                                />
                                    <Button variant="fab" color="primary" style={styles.del} onClick={()=>deleteReq(props.jobEdit,req,idx)}>
                                        X
                                    </Button>
                                </div>
                            )
                        })}
                    </div>)
                    :null}
                    {props.jobEdit.jobBenefList ?
                    (<div>
                        <label style={styles.label}>Benefits</label>
                        {props.jobEdit.jobBenefList.map((benef,idx) => {
                            return (
                                <div>
                                <TextField
                                    classes={{root: classes.formItem}}
                                    id="benef"
                                    onChange={(event)=>props.jobEdit.jobBenefList[idx]=event.target.value}
                                    margin="normal"
                                    defaultValue={benef.name}
                                />
                                <Button variant="fab" color="primary" style={styles.del} onClick={()=>deleteBenefit(props.jobEdit,benef,idx)}>
                                     X
                                 </Button>
                                </div>
                            )
                        })}
                    </div>)
                    :null}
                    <div style={styles.btn}>
                    <Button color="primary"   onClick={()=>putJob(props.jobEdit)}  >
                        Update
                    </Button>
                    <Button color="primary" onClick={closeUpdate}>
                        Cancel
                    </Button>
                    </div>
                </form>
            </Dialog>
        </MuiThemeProvider>
    );
};
const mapStateToProps = (state) => ({
    jobEdit: state.job.jobEdit,
    companies:state.company.companyInfoList,
    isAvailable:state.job.isAvailable,
});
const mapDispatchToProps=(dispatch)=>({
    updateJob:(jobEdit)=> dispatch(jobActions.updateJob(jobEdit)),
    checkAv:(job) => dispatch(jobActions.checkAv(job)),
    deleteReq:(req) => dispatch(jobActions.deleteReq(req)),
    deleteBenefit:(benef) => dispatch(jobActions.deleteBenefit(benef)),
});

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(JobUpdate));