import React,{Component} from 'react';
import {
    withStyles
} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import { connect } from 'react-redux';
import * as jobActions from "../actions/job";
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles={
    btn:{
        backgroundColor:'#5f5fc4',
        color:'white'
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
    disabled:{
        backgroundColor:'#90a4ae',
        color:'white'
    }
};
const app={jobId:'',userId:'',isAccepted:false};

class JobDetails extends Component {
    state={
        disable:false
    };

    handleDisable=()=>{
        this.setState({
            disable:true
        })
    };

    componentDidMount(){
        const jobId=this.props.match.params.jobid;
        this.props.getJobDetail(jobId);
        this.props.getReq();
        this.props.getBenefits();

    }

    sendApp=()=>{
       this.handleDisable();
       this.props.sendApp(app);
    };

    render(){
        return(
            <div>
                <h1>{this.props.jobComp ? this.props.jobComp.name : null}</h1>
                <h2>{this.props.jobComp ? this.props.jobComp.description : null}</h2>
                <hr></hr>
                <div>
                 <Grid container >
                     <Grid item sm={6} xs={12}>
                         <h2>Job requirements</h2>
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
                {(this.state.disable) ? <Button disabled style={styles.btn && styles.disabled} ><Send/>&nbsp; Apply</Button>
                    :  <Button style={styles.btn} onClick={this.sendApp}><Send/>&nbsp; Apply</Button>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    jobComp:state.job.jobDetail,
    jobReqs:state.job.jobReqList,
    jobBenefits:state.job.jobBenefList,
    disabled:state.job.disabled
});
const mapDispatchToProps=(dispatch)=>({
    getJobDetail:(jobId)=> dispatch(jobActions.getJobDetail(jobId)),
    getReq:()=> dispatch(jobActions.getReq()),
    getBenefits:()=> dispatch(jobActions.getBenefits()),
    sendApp:(app)=> dispatch(jobActions.sendApp(app)),
});
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(JobDetails));