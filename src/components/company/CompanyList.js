import React from 'react';
import {
    withStyles
} from 'material-ui/styles';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import * as companyActions from "../../actions/company";
import { connect } from 'react-redux';

const styles =  {
    table:{
        align:'center',
        display:'flex-box',
        flexWrap: 'wrap',
        width:'65%',
        position:'relative',
        float:'right',
        marginRight:100

    },
    th:{
        width:100
    },
    list:{
        backgroundColor:'#98ee99'
    },
    tableBox:{
        width:'80%',
        height:'auto',
        position:'relative',
        marginTop:100,
        marginRight:1000

    },
    title:{
        width:'65%',
        height: 70,
        backgroundColor: '#98ee99',
        float:'right',
        marginRight:100

    },
    detail:{
        color:"#66bb6a"
    }
};


const CompanyList = (props)=> {
    const {classes, companies, selected} = props;

    function onDelete(compId) {
        props.deleteCompany(compId);
    }

    function onUpdate(comp) {
        props.openUpdate();
        props.getEditCompany(comp);
    }

    function getDetails(comp) {
        props.goToCompanyDetails(comp);
        props.openJobs();
    }

    return(
        <div style={styles.tableBox}>
            <div style={styles.title}><h1 >Companies</h1></div>
            <Table classes={{root:classes.table}}>
                <TableHead>
                    <TableRow >
                        <TableCell ></TableCell>
                        <TableCell >Id</TableCell>
                        <TableCell >Name</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies.map(comp=> {
                        return (
                            <TableRow key={comp.id} selected={selected}>
                                <TableCell ><IconButton onClick={()=>getDetails(comp)}><AccountCircle style={styles.detail}/></IconButton></TableCell>
                                <TableCell >{comp.id}</TableCell>
                                <TableCell >{comp.name}</TableCell>
                                <TableCell>
                                    <IconButton  aria-label="Edit" onClick={()=>onUpdate(comp)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton  aria-label="Delete" onClick={()=>onDelete(comp.id)}>
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
    companies:state.company.companyInfoList
});
const mapDispatchToProps=(dispatch)=>({
    deleteCompany:(compId) => dispatch(companyActions.deleteCompany(compId)),
    getEditCompany:(compEdit)=> dispatch(companyActions.getEditCompany(compEdit)),
    goToCompanyDetails: (comp) => dispatch(companyActions.goToCompanyDetails(comp)),
});
export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CompanyList));