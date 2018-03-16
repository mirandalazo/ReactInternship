import React, {Component} from 'react';
import {connect} from "react-redux";
import AllJobsList from '../components/jobs/AllJobsList';
import * as jobActions from "../actions/job";


class AllJobs extends Component{

    componentDidMount(){
        this.props.getAllJobs();
    }

    render() {
        return (
            <div>
               <AllJobsList/>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    getAllJobs:() => dispatch(jobActions.getAllJobs())
});
export default connect(null, mapDispatchToProps)(AllJobs);