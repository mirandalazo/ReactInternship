import React, { Component } from 'react';
import './App.css';
import Layout from './pages/Layout';
import {
    withStyles
} from 'material-ui/styles';


const styles = theme => ({
  app:{backgroundColor:'#aaffaa',
      textAlign:'center'}
});


class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout/>
      </div>
    );
  }
}

export default withStyles(styles)(App);
