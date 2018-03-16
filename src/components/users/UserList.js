import React from 'react';
import {
    withStyles
} from 'material-ui/styles';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import IconButton from 'material-ui/IconButton';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { connect } from 'react-redux';
import * as userActions from "../../actions/user";

const styles =  {
    table:{
        align:'center',
        display:'flex-box',
        flexWrap: 'wrap',
       float:'right',
       width:'85%',
        position:'relative',
        marginLeft:200
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
        marginLeft:200
    },
    tableBox:{
         width:'80%',
        height:'auto',
        position:'relative',
    }
}

const UserList = (props)=> {
  const {classes}=props;
    
  function onDelete(userId) {
      props.deleteUser(userId);
  }

  function onUpdate(user) {
        props.openUpdate();
        props.getEditUser(user);
  }

  return(
    <div style={styles.tableBox}>
    <div style={styles.title}><h1>Users</h1></div>
      <Table classes={{root:classes.table}}>
        <TableHead>
          <TableRow >
            <TableCell classes={{root:classes.th}}>Username</TableCell>
            <TableCell classes={{root:classes.th}}>FirstName</TableCell>
            <TableCell classes={{root:classes.th}}>LastName</TableCell>
            <TableCell numeric classes={{root:classes.th}}>UserRoleId</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>                  
           <TableBody>
        {props.users.map(user=> {
            return (
              <TableRow key={user.id}>
                <TableCell classes={{root:classes.th}}>{user.username}</TableCell>
                <TableCell classes={{root:classes.th}}>{user.firstName}</TableCell>
                <TableCell classes={{root:classes.th}}>{user.lastName}</TableCell>
                <TableCell numeric classes={{root:classes.th}}>{user.userRoleId}</TableCell>
                <TableCell visibile="false">{user.password}</TableCell>
                <TableCell>
                    <IconButton aria-label="Delete" onClick={()=>onDelete(user.id)}>
                        <DeleteIcon />
                     </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton aria-label="Edit" onClick={()=>onUpdate(user)}>
                        <EditIcon />
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
    users: state.user.userInfoList,
});
const mapDispatchToProps=(dispatch)=>({
    deleteUser:(userId) => dispatch(userActions.deleteUser(userId)),
    getEditUser:(userEdit)=> dispatch(userActions.getEditUser(userEdit)),
});

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UserList));
