import React from 'react';
import {
    withStyles
} from 'material-ui/styles';

const styles = {
    home:{
        display: 'flex-box',
        flexWrap: 'wrap',
        align:" center",
        textAlign:'center',
        margin:"auto",
        marginTop:100,
        backgroundColor:"#d1c4e9",
        height:"100%",
        width:"50%",
        borderRadius:5
    }
};
const Homepage = (props)=>{

    return(
        <div style={styles.home}>
        <h1>Mi casa su casa</h1>
        <h2>Please login</h2>
        </div>
    )
};

export default withStyles(styles)(Homepage);