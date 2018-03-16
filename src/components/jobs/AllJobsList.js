import React from 'react';
import {
    withStyles
} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardContent} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import HourglassEmpty from 'material-ui-icons/HourglassEmpty';
import CheckCircle from 'material-ui-icons/CheckCircle';

import * as jobActions from "../../actions/job";
import { connect } from 'react-redux';

const styles={
    card: {
        maxWidth: '80%',
        position: 'relative',
        align: 'center',
        margin: 'auto',
    },
    check:{
        color:"green"
    },
    notcheck:{
        color:"red"
    },
    list:{
        marginTop:50
    },
    item:{
        display:' inline-block',
        minHeight:80
    },
    available:{
        float:' right',
        marginTop:20
    },
    avatar:{

        float:'left',
        marginTop:30,
        marginLeft:30,
        minWidth:60,
        minHeight:60,
        backgroundColor:'#ff867c',
    }
};

const AllJobsList = (props)=> {

    function goToJob(job){
        props.goToJobDetail(job);
    }

    return(
        <div style={styles.list}>
            <Grid container>
                {props.jobs.map((job,idx) => {
                    return(
                        <Grid item md={12} sm={6}>
                            <Card style={styles.card} onClick={()=>goToJob(job)}>
                                <Avatar style={styles.avatar} aria-label="Job" >
                                    Job {idx+1}
                                </Avatar>
                                <CardHeader style={styles.item }

                                    title={job.name}
                                    subheader={job.companyInfo.name}

                                />
                                <CardContent style={styles.item && styles.available}>
                                    {(job.isAvailable) ? <CheckCircle style={styles.check}/> : null}
                                    {(!job.isAvailable)? <HourglassEmpty style={styles.notcheck}/>:null}

                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
};
const mapStateToProps = (state) => ({
    jobs:state.job.jobInfoList
});
const mapDispatchToProps=(dispatch)=>({
    goToJobDetail:(job)=> dispatch(jobActions.goToJobDetail(job))
});

export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AllJobsList));