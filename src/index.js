import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store, { history } from './config/store';
import { ConnectedRouter } from 'react-router-redux';
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(
     <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>  
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
