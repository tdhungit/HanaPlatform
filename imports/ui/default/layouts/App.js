import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import container from '/imports/common/Container';
import ManagerLayout from "./ManagerLayout";
import HomeLayout from "./HomeLayout";

import Public from '../components/Router/Public';
import Authenticate from '../components/Router/Authenticate';

import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import RecoverPassword from '../pages/auth/RecoverPassword';
import ResetPassword from '../pages/auth/ResetPassword';

class App extends Component {
    render() {
        const appProps = this.props;
        return (
            <Router>
                <div className="PenguinPlatform">
                    <Switch>
                        <Public exact path="/signup" component={Signup} {...appProps} />
                        <Public exact path="/login" component={Login} {...appProps} />
                        <Route exact path="/recover-password" component={RecoverPassword}/>
                        <Route exact path="/reset-password/:token" component={ResetPassword}/>

                        <Authenticate path="/manager" component={ManagerLayout} {...appProps}/>
                        <Route path="/" component={HomeLayout} {...appProps}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    loggingIn: PropTypes.bool,
    authenticated: PropTypes.bool,
};

export default container((props, onData) => {
    const userSubscription = Meteor.subscribe('users.user');
    const settingSubscription = Meteor.subscribe('settings.systemSettings');

    if (settingSubscription && settingSubscription.ready()
        && userSubscription && userSubscription.ready()) {
        const loggingIn = Meteor.loggingIn();
        const userId = Meteor.userId();

        onData(null, {
            loggingIn,
            authenticated: !loggingIn && !!userId
        });
    }
}, App);
