import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';

import appReducer from './app/app.reducer';
import {reducer as formReducer} from 'redux-form';

/**
 * init redux store reducer
 * @type {Reducer<any>}
 */
const allReducers = combineReducers({
    app: appReducer,
    form: formReducer
});

/**
 * init redux store
 * @type {Store<any>}
 */
const store = createStore(
    allReducers,
    compose(
        applyMiddleware(thunk),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
