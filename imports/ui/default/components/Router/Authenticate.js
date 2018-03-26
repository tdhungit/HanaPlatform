import React from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {Route, Redirect} from 'react-router-dom';
import {Loading} from '../Loading/Loading';

const Authenticate = ({loggingIn, authenticated, component, ...rest}) => (
    <Route {...rest} render={(props) => {
        let state = {};
        state.app = rest.app || {};
        state.appLoading = rest.appLoading || (() => {

        });

        // check logging in
        if (loggingIn) {
            return <Loading/>;
        }

        // check permission
        const sysCompanyId = Meteor.user().sysCompanyId;

        return (authenticated)
            ? (React.createElement(component, {...props, ...state, loggingIn, authenticated}))
            : (<Redirect to="/login"/>);
    }}/>
);

Authenticate.propTypes = {
    loggingIn: PropTypes.bool,
    authenticated: PropTypes.bool,
    component: PropTypes.func,
};

export default Authenticate;