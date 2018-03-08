import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';

import appReducer from './app/app.reducer';

const allReducers = combineReducers({
    app: appReducer
});

const store = createStore(
    allReducers,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
