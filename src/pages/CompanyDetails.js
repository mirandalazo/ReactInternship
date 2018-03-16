import React,{Component} from 'react';
import {
    withStyles
} from 'material-ui/styles';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import HourglassEmpty from 'material-ui-icons/HourglassEmpty';
import CheckCircle from 'material-ui-icons/CheckCircle';
import Search from 'material-ui-icons/Search';
import IconButton from 'material-ui/IconButton';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import { connect } from 'react-redux';
import * as companyActions from "../actions/company";
import * as jobActions from "../actions/job";
import JobUpdate from '../components/jobs/JobUpdate';
import CreateJob from '../components/jobs/CreateJob';

const styles={
    table:{
        align:'center',
        display:'flex-box',
        flexWrap: 'wrap',
        float:'right',
        width:'85%',
        position:'relative',
        marginLeft:150,
    },
    th:{
        width:200,
        fontSize:20
    },
    list:{
        backgroundColor:'#98ee99',
        marginTop:110
    },
    title:{
        width:'85%',
        height:60,
        backgroundColor:'#98ee99',
        float:'right',
        marginLeft:150,
        marginTop:100
    },
    tableBox:{
        width:'80%',
        height:'auto',
        position:'relative',
        marginTop:50
    },
    thd:{
        fontStyle:'bold'
    },
    check:{
        color:"green"
    },
    notcheck:{
        color:"red"
    },
    name:{
        width:'85%',
        height:60,
        float:'right',
        marginLeft:150,
        marginBottom:50
    },
    jobs:{
        marginTop:10,
        position:'relative'
    },
    btn:{
        backgroundColor:'#98ee99',
        marginBottom:20,
        marginLeft:200
    },
    space:{
        marginLeft:270
    },
    search:{
        color:'#5f5fc4'
    },
    create:{
        display:"flex-wrap",
        position:"relative",
        align:"center",
        margin:"auto"
    }
};

class CompanyDetails extends Component {
    state={
        openJobUpdate:false,
        showAdd:true
    };

    handleClose=()=>{
        this.setState({
            openJobUpdate:false
        });

        this.props.closeEdit();
    };

    onDelete=(job) =>{
        this.props.deleteJob(job);
    };

    onUpdate=(jobEdit)=> {
        this.setState({
            openJobUpdate:true
        });
        this.props.getEditJob(jobEdit);

    };

    showForm=()=>{
        this.setState({
            showAdd: false
        })
    };

    closeForm=()=>{
        this.setState({
            showAdd: true
        })
    };

    getDetailJob=(job)=>{
        this.props.getJob(job);
    };

    componentDidMount(){
        const compId=this.props.match.params.id;
        this.props.getCompanyJobs();
        this.props.getCompDetail(compId);
       this.props.getCompanies();

    }

      handleSubmit=(values)=>{
       this.props.createJob(values);
    };


    render(){
        return(
            <div style={styles.tableBox}>

                <div style={styles.name}><h1>{this.props.mycomp.name}</h1></div>
                <div style={styles.space}></div>
                <div style={styles.create} >
                     <CreateJob onSubmit={this.handleSubmit}  show={this.state.showAdd} showForm={this.showForm} hide={this.closeForm}/>
                </div>
                <div style={styles.title}><h1 style={styles.jobs}>Jobs</h1></div>
                <Table style={styles.table}>
                    <TableHead style={styles.thd}>
                        <TableRow >
                            <TableCell></TableCell>
                            <TableCell style={styles.th}>Name</TableCell>
                            <TableCell style={styles.th}>Description</TableCell>
                            <TableCell style={styles.th}>CompanyId</TableCell>
                            <TableCell style={styles.th}>Available</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {this.props.jobs &&
                    <TableBody>
                        {this.props.jobs.map(job => {
                            return (
                                <TableRow key={job.id}>
                                    <TableCell>
                                        <IconButton style={styles.search} aria-label="Details"
                                                    onClick={() => this.getDetailJob(job)}>
                                            <Search/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell style={styles.th}>{job.name}</TableCell>
                                    <TableCell style={styles.th}>{job.description}</TableCell>
                                    <TableCell style={styles.th}>{job.companyId}</TableCell>
                                    {job.isAvailable ?
                                        <TableCell> <CheckCircle style={styles.check}/> </TableCell> : null}
                                    {(!job.isAvailable) ?
                                        <TableCell> <HourglassEmpty style={styles.notcheck}/></TableCell> : null}
                                    <TableCell>
                                        <IconButton aria-label="Edit" onClick={() => this.onUpdate(job)}>
                                            <EditIcon/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="Delete" onClick={() => this.onDelete(job)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                    }
                </Table>

                {this.state.openJobUpdate && this.props.jobEdit ? <JobUpdate closeUpdate={this.handleClose} closeAfter={this.handleClose}/> : null}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    jobEdit: state.job.jobEdit,
    jobs:state.job.companyJobList,
    mycomp:state.company.company,
});
const mapDispatchToProps=(dispatch)=>({
    createJob:(job) => dispatch(jobActions.createJob(job)),
    getCompanies:()=> dispatch(companyActions.getCompanies()),
    getCompDetail: (compId) => dispatch(companyActions.getCompDetail(compId)),
    getJob:(job)=> dispatch(jobActions.getJob(job)),
    deleteJob:(job) => dispatch(jobActions.deleteJob(job)),
    getEditJob:(jobEdit)=> dispatch(jobActions.getEditJob(jobEdit)),
    getJobs:()=>dispatch(jobActions.getJobs()),
    getCompanyJobs:()=>dispatch(jobActions.getCompanyJobs()),
    closeEdit: () => dispatch(jobActions.closeEdit()),
});
export default connect( mapStateToProps,mapDispatchToProps)(withStyles(styles)(CompanyDetails));