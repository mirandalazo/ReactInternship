import React from 'react';
import {
    withStyles
} from 'material-ui/styles';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import HourglassEmpty from 'material-ui-icons/HourglassEmpty';
import CheckCircle from 'material-ui-icons/CheckCircle';
import IconButton from 'material-ui/IconButton';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import * as jobActions from "../../actions/job";
import { connect } from 'react-redux';

const styles =  {
    table:{
        align:'center',
        display:'flex-box',
        flexWrap: 'wrap',
        float:'right',
        width:'85%',
        position:'relative',
        marginLeft:150
    },
    th:{
        width:200
    },
    list:{
        backgroundColor:'#98ee99'
    },
    title:{
        width:'85%',
        height:60,
        backgroundColor:'#98ee99',
        float:'right',
        marginLeft:150
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
    }
};

const JobList = (props)=> {
    const{classes}=props;

    function onDelete(jobId) {
        props.deleteJob(jobId);
    }

    function onUpdate(jobEdit) {
        props.openUpdate();
        props.getEditJob(jobEdit);
    }

    return(
        <div style={styles.tableBox}>
            <div style={styles.title}><h1>Jobs</h1></div>
            <Table classes={{root:classes.table}}>
                <TableHead style={styles.thd}>
                    <TableRow >
                        <TableCell classes={{root:classes.th}}>Name</TableCell>
                        <TableCell classes={{root:classes.th}}>Description</TableCell>
                        <TableCell classes={{root:classes.th}}>CompanyId</TableCell>
                        <TableCell>Available</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.jobs.map(job=> {
                        return (
                            <TableRow key={job.id}>
                                <TableCell classes={{root:classes.th}}>{job.name}</TableCell>
                                <TableCell classes={{root:classes.th}}>{job.description}</TableCell>
                                <TableCell classes={{root:classes.th}}>{job.companyId}</TableCell>
                                {job.isAvailable ? <TableCell>  <CheckCircle style={styles.check}/> </TableCell>:null}
                                {(!job.isAvailable)?<TableCell> <HourglassEmpty style={styles.notcheck}/></TableCell>:null}
                                <TableCell>
                                    <IconButton aria-label="Edit" onClick={()=>onUpdate(job)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="Delete" onClick={()=>onDelete(job.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

const mapStateToProps = (state) => ({
    jobs:state.job.jobInfoList
});
const mapDispatchToProps=(dispatch)=>({
    deleteJob:(jobId) => dispatch(jobActions.deleteJob(jobId)),
    getEditJob:(jobEdit)=> dispatch(jobActions.getEditJob(jobEdit)),
});

export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(JobList));
