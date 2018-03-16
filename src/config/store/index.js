import userReducer from '../../reducers/userReducer';
import jobReducer from '../../reducers/jobReducer';
import companyReducer from '../../reducers/companyReducer';
import { reducer as reduxFormReducer } from 'redux-form';

import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

export const history = createHistory();

const rootReducer = combineReducers({
    user: userReducer,
    job: jobReducer,
    company:companyReducer,
    router: routerReducer,
    form:reduxFormReducer,
});

const middleWares = [
    thunk,
    routerMiddleware(history)
];

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

        }) : compose;

const enhancers = composeEnhancers(
    applyMiddleware(...middleWares),
);

const store = createStore(rootReducer, enhancers);

export default store;