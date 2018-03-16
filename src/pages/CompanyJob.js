import React,{Component} from 'react';
import {
    withStyles
} from 'material-ui/styles';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import CheckCircle from 'material-ui-icons/CheckCircle';
import Schedule from 'material-ui-icons/Schedule';
import * as jobActions from "../actions/job";
import Switch from 'material-ui/Switch';

const styles={
    details:{
        display:'block',
        position:'relative',
        width:'90%',
        minHeight:300
    },
    req:{
        float:'left',
        clear:'both',
        marginLeft:30,
        display:'block'

    },
    benef:{
        float:'right',
        marginRight:30,
        display:'block'
    },
    btn:{
        backgroundColor:'#b3e5fc',
        marginBottom:20
    },
    paper:{

        maxWidth:500,
        minHeight:50,
        position:'relative',
        align:'center',
        margin:'auto',
        marginBottom:10,
    },
    text:{
        paddingTop:10
    },
    table:{
        align:'center',
        display:'flex-box',
        flexWrap: 'wrap',
        float:'right',
        width:'85%',
        position:'relative',
        fontSize:20
    },
    th:{
        width:100
    },
    tableBox:{
        width:'80%',
        height:'auto',
        position:'relative',
        align:'center',
        margin:'auto',
        marginTop:100,
        marginLeft:10
    },
    title:{
        width:'85%',
        height: 70,
        backgroundColor: '#98ee99',
        float:'right',
    },
    wait:{
        color:'orange'
    },
    accept:{
        color:'green'
    }

};
var req={name:'', jobId:''};
var benefit={name:'', jobId:''};

class CompanyJob extends Component {
    state={
        openReq:false,
        openBenef:false,
    };

    handleReq=()=>{
        this.setState({
            openReq:true
        })
    };

    handleBenefit=()=>{
        this.setState({
            openBenef:true
        })
    };
    closeReq=()=>{
        this.setState({
            openReq:false
        })
    };
    closeBenefit=()=>{
        this.setState({
            openBenef:false
        })
    };

    addReq=(req)=>{
       this.closeReq();
       this.props.addReq(req)
    };

    addBenefit=(benefit)=>{
        this.closeBenefit();
        this.props.addBenefit(benefit)
    };

    update=(app)=>{
        this.props.putApp(app);
    };

    acceptApp=(app)=>{
        this.props.checkAccept(app);
    };

    componentDidMount(){
      const jobId=localStorage.getItem('jobId');
         this.props.getJobDetail(jobId);
        this.props.getReq();
        this.props.getBenefits();
        this.props.getApps();
    }

    render(){

        return(
            <div>
                <h1> {this.props.jobComp ? this.props.jobComp.name : null }</h1>
                <h3>{this.props.jobComp ? this.props.jobComp.description : null }</h3>
                <hr></hr>
                <div style={styles.details}>
                    <Grid container >
                        <Grid item sm={6} xs={12}>
                            <h2>Job requirements</h2>
                            <Button style={styles.btn} onClick={this.handleReq}>Add requirement</Button>
                            <Dialog open={this.state.openReq}>
                                <DialogTitle>Add a new requirement</DialogTitle>
                                <TextField
                                    id="req"
                                    multiline
                                    rows="4"
                                    onChange={(event)=>req.name=event.target.value}
                                    margin="normal"
                                />
                                <Button onClick={()=>this.addReq(req)}>Add</Button>
                                <Button onClick={this.closeReq}>Close</Button>
                            </Dialog>
                            {this.props.jobReqs.map(req => {
                                return(
                                    <Paper style={styles.paper} elevation={4}>
                                        <Typography style={styles.text} variant="headline" component="h3">
                                            {req.name}
                                        </Typography>
                                    </Paper>
                                )
                                }
                            )}
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <h2>Job benefits</h2>
                            <Button style={styles.btn}  onClick={this.handleBenefit}>Add benefit</Button>
                            <Dialog open={this.state.openBenef}>
                                <DialogTitle>Add a new benefit</DialogTitle>
                                <TextField
                                    id="benef"
                                    multiline
                                    rows="4"
                                    onChange={(event)=>benefit.name=event.target.value}
                                    margin="normal"
                                />
                                <Button onClick={()=>this.addBenefit(benefit)}>Add</Button>
                                <Button onClick={this.closeBenefit}>Close</Button>
                            </Dialog>
                            {this.props.jobBenefits.map(ben => {
                                    return(
                                        <Paper style={styles.paper} elevation={4}>
                                            <Typography style={styles.text} variant="headline" component="h3">
                                                {ben.name}
                                            </Typography>
                                        </Paper>
                                    )
                                }
                            )}
                        </Grid>
                    </Grid>
                </div>

                <div style={styles.tableBox}>
                    <div style={styles.title}><h1 >Job Applications</h1></div>
                <Table style={styles.table}>
                    <TableHead>
                    <TableRow >
                        <TableCell style={styles.th}>Username</TableCell>
                        <TableCell style={styles.th}>Job Id</TableCell>
                        <TableCell style={styles.th}>Status</TableCell>
                        <TableCell style={styles.th}>Accepted</TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {this.props.apps.map(app=>{
                            return(
                                <TableRow key={app.id} >
                                    <TableCell >{app.userInfo.username}</TableCell>
                                    <TableCell >{app.jobId}</TableCell>
                                    <TableCell >
                                        {app.isAccepted ? (<div><CheckCircle  style={styles.accept}/> <span > Accepted</span> </div>): (<div><Schedule style={styles.wait}/><span>&nbsp; In review</span></div>)}
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                        onChange={(event)=>{app.isAccepted=event.target.checked}}
                                        checked={app.isAccepted}
                                        onClick={()=>this.update(app)}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    jobComp:state.job.jobDetail,
    jobReqs:state.job.jobReqList,
    jobBenefits:state.job.jobBenefList,
    apps:state.job.apps,
    company:state.company.company,
    isAccepted:state.job.isAccepted
});
const mapDispatchToProps=(dispatch)=>({
    getJobDetail : (jobid) => dispatch(jobActions.getJobDetail(jobid)),
    addReq:(req)=> dispatch(jobActions.addReq(req)),
    getReq:()=> dispatch(jobActions.getReq()),
    addBenefit:(benefit)=> dispatch(jobActions.addBenefit(benefit)),
    getBenefits:()=> dispatch(jobActions.getBenefits()),
    getApps:()=> dispatch(jobActions.getApps()),
    checkAccept: (app) => dispatch(jobActions.checkAccept(app)),
    putApp: (app) => dispatch(jobActions.putApp(app)),
});
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CompanyJob));