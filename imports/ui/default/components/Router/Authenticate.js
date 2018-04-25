import React from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {Route, Redirect} from 'react-router-dom';

import {Loading} from '../Loading/Loading';
import Users from '/imports/collections/Users/Users';
import NoAccess from '../../pages/acl/NoAccess';
import {utilsHelper} from '../../helpers/utils/utils';
import {modulesComponent} from '../../../../config/config.inc';

const Authenticate = ({loggingIn, authenticated, component, ...rest}) => (
    <Route {...rest} render={(props) => {
        let state = {};
        state.app = rest.app || {};
        state.appLoading = rest.appLoading || (() => {

        });
        state.appSetVar = rest.appSetVar || (() => {

        });

        // check logging in
        if (loggingIn) {
            return <Loading/>;
        }

        if (!authenticated) {
            return <Redirect to="/login"/>;
        }

        // check permission
        let noDefined = false;
        const currentComponent = utilsHelper.currentComponentName(component);
        if (modulesComponent.layout.indexOf(currentComponent) < 0) {
            if (!component.viewInfo
                || !component.viewInfo.controller
                || !component.viewInfo.action) {
                noDefined = true;
            }
        }

        if (noDefined) {
            return (
                <code>
                    Please defined viewInfo in {currentComponent} component.<br/>
                    Example:<br/>
                    class {currentComponent} extends React.Component {'{'}<br/>
                        {' '} static viewInfo = {'{'}
                            controller: 'Employees',
                            action: 'List'
                        {'}'};<br/>
                        {' '} render() {'{'}{'}'}<br/>
                    {'}'}
                </code>
            );
        }

        // check permission access
        const controllerName = component.viewInfo && component.viewInfo.controller || '';
        const actionName = component.viewInfo && component.viewInfo.action || '';
        const isAccess = Users.checkAccess(Meteor.user(), controllerName, actionName);
        return isAccess
            ? (React.createElement(component, {...props, ...state, loggingIn, authenticated}))
            : (<NoAccess/>);
    }}/>
);

Authenticate.propTypes = {
    loggingIn: PropTypes.bool,
    authenticated: PropTypes.bool,
    component: PropTypes.func,
};

export default Authenticate;