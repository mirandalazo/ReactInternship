import React, {Component} from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import {
    withStyles
} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import WorkExperience from '../components/users/WorkExperience';
import Education from '../components/users/Education';
import * as userActions from "../actions/user";

const styles={
    avatar:{
        margin:'auto',
        height:300,
        width:300,
        position:'relative',
        align:'center',
        marginTop:13,
    },
    picture:{
        backgroundColor:'#bbdefb',
        display:'flex-wrap',
        position:'relative',
    },
    name:{
        fontSize:60
    },
    grid:{
        width:'95%'
    },
    avatarJob:{

        float:'left',
        marginTop:10,
        marginLeft:10,
        width:50,
        height:50,
        backgroundColor:'#ff867c',
    },
    item:{
        display:'inline-block',
        minHeight:70,
        marginBottom:10
    },
    apps:{
        marginLeft:50,
        marginTop:20,

    },
    card: {
        maxWidth: '80%',
        height:85,
        position: 'relative',
        align: 'center',
        margin: 'auto',
        marginBottom:5
    },
    accept:{
        backgroundColor:"#b2fab4",
        opacity:0.9
    },
    notaccept:{
        backgroundColor:"#ffa4a2",
        opacity:0.9
    }
};

class Profile extends Component {
    state={
        showAdd:true,
        showEd:true,
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

    showForm2=()=>{
        this.setState({
            showEd: false
        })
    };

    closeForm2=()=>{
        this.setState({
            showEd: true
        })
    };

    handleSubmit=(values)=>{
        this.props.createWorkXp(values);
    };

    handleSubmit2=(values)=>{
        this.props.createEducation(values);
    };

    componentDidMount(){
        this.props.getMyApps();
        this.props.getWork();
    }
    render(){
        return(
            <div>
                <div style={styles.picture}>
                    <Avatar alt="Profile Picture" src="profile.jpg" style={styles.avatar}/>
                    <div style={styles.name}>{this.props.user.firstName}&nbsp;{this.props.user.lastName}</div>
                    <hr></hr>
                </div>

                <Grid container style={styles.grid}>
                    <Grid item sm={6} xs={12}>
                        <h2>Work experience</h2>
                        <WorkExperience onSubmit={this.handleSubmit} showForm={this.showForm} show={this.state.showAdd}  hide={this.closeForm}/>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <h2>Education</h2>
                        <Education onSubmit={this.handleSubmit2} showForm={this.showForm2} show={this.state.showEd}  hide={this.closeForm2}/>
                    </Grid>
                    <Grid item sm={12} style={styles.apps}>
                        <h2>MY APPLICATIONS</h2>
                        {this.props.myapps.map(app=>{
                            return(
                                    <Card style={styles.card}>
                                        <Avatar style={styles.avatarJob} aria-label="Job">
                                            Job
                                        </Avatar>
                                        {app.isAccepted ?
                                            <CardHeader style={styles.item && styles.accept}
                                                        title={app.jobInfo.name}
                                                        subheader="Application accepted"
                                            />

                                            :
                                            <CardHeader style={styles.item && styles.notaccept}
                                                        title={app.jobInfo.name}
                                                        subheader="Application in review"
                                            />
                                        }
                                    </Card>
                            )
                        }
                            )
                        }
                    </Grid>
                </Grid>
                <Grid container style={styles.grid}>
                    {this.props.work &&
                    <Grid item sm={6} xs={12}>
                        {this.props.workList.map(work => {
                            return (
                                <Card>
                                    <CardHeader
                                        title={work.institution}
                                        subheader={work.description}
                                    />
                                    <CardContent>
                                        <Typography>{work.startDate}</Typography>
                                        <Typography>{work.endDate}</Typography>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </Grid>
                    }
                    <Grid item sm={6} xs={12}>

                    </Grid>
                </Grid>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user:state.user.user,
    myapps:state.user.myapps,
    workLsit:state.user.workList,
});
const mapDispatchToProps=(dispatch)=>({
    createWorkXp:(workxpList) => dispatch(userActions.createWorkXp(workxpList)),
    createEducation:(educationList) => dispatch(userActions.createEducation(educationList)),
    getMyApps:()=>dispatch(userActions.getMyApps()),
    getWork:()=>dispatch(userActions.getWorkXp()),
});

export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Profile));