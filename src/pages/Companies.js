import React, {Component} from 'react';
import CreateCompany from '../components/company/CreateCompany';
import CompanyList from '../components/company/CompanyList';
import CompanyUpdate from '../components/company/CompanyUpdate';
import { connect } from 'react-redux';
import * as companyActions from "../actions/company";


class Companies extends Component{

    state={
        openUpdate:false,
        openDetails:false,
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

    handleDetails=()=>{
        this.setState({
            openDetails:true,
        });
    };

    componentDidMount(){
        this.props.getCompanies();
    }

    render(){
        return(
            <div>
                <h1>List of companies Page</h1>
                <CreateCompany/>
                <CompanyList openUpdate={this.openUpdate} openJobs={this.handleDetails} />
                {this.state.openUpdate ? <CompanyUpdate closeUpdate={this.closeUpdate} closeAfter={this.closeUpdate}/> : null}

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCompanies: () => dispatch(companyActions.getCompanies()),
});
export default connect(null, mapDispatchToProps)(Companies);