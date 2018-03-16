import React, {Component} from 'react';
import CreateJob from '../components/jobs/CreateJob';
import JobList from '../components/jobs/JobList';
import JobUpdate from '../components/jobs/JobUpdate';
import {connect} from "react-redux";
import * as companyActions from "../actions/company";
import * as jobActions from "../actions/job";

const styles = theme => ({
    jobs:{
        marginTop:200
    }
});

class Jobs extends Component{
    state={
        openUpdate:false,
        showAdd:true
    };

    openUpdate=()=> {
        this.setState({
            openUpdate: true
        })
    };

    closeUpdate=()=> {
        this.setState({
            openUpdate: false
        })
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

    componentDidMount(){
        this.props.getJobs();
        this.props.getCompanies();
    }
    render(){
        return(
             <div style={styles.jobs} >
            <h1>Jobs</h1>
                 <CreateJob show={this.state.showAdd} showForm={this.showForm} hide={this.closeForm}/>
                 <JobList openUpdate={this.openUpdate}/>
                 {this.state.openUpdate ? <JobUpdate closeUpdate={this.closeUpdate} closeAfter={this.closeUpdate}/> : null}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCompanies: () => dispatch(companyActions.getCompanies()),
    getJobs:() => dispatch(jobActions.getJobs())
});
export default connect(null, mapDispatchToProps)(Jobs);