import React from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {Route, Redirect} from 'react-router-dom';

import {Loading} from '../Loading/Loading';
import Users from '/imports/collections/Users/Users';
import NoAccess from '../../pages/acl/NoAccess';

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
        const isAccess = Users.checkAccess(Meteor.userId());

        return authenticated
            ? isAccess
                ? (React.createElement(component, {...props, ...state, loggingIn, authenticated}))
                : (<NoAccess/>)
            : (<Redirect to="/login"/>);
    }}/>
);

Authenticate.propTypes = {
    loggingIn: PropTypes.bool,
    authenticated: PropTypes.bool,
    component: PropTypes.func,
};

export default Authenticate;