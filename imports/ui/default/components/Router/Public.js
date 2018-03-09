import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

const Public = ({loggingIn, authenticated, component, ...rest}) => (
    <Route {...rest} render={(props) => {
        let state = {};
        state.app = rest.app || {};
        state.appLoading = rest.appLoading || (() => {});

        if (loggingIn) return <div></div>;

        return !authenticated ?
            (React.createElement(component, {...props, ...state, loggingIn, authenticated})) :
            (<Redirect to="/"/>);
    }}/>
);

Public.propTypes = {
    loggingIn: PropTypes.bool,
    authenticated: PropTypes.bool,
    component: PropTypes.func,
};

export default Public;
