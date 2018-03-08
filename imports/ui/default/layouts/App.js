import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; // or HashRouter
import {connect} from 'react-redux';

import container from '/imports/common/Container';
import ManagerLayout from "./ManagerLayout";
import HomeLayout from "./HomeLayout";

import Public from '../components/Router/Public';
import Authenticate from '../components/Router/Authenticate';
import Loading from '../components/Loading/Loading';

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
                    {appProps.app.loading ? <Loading/> : null}
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

const mapStateToProps = (state) => {
    return {app: state.app}
};

export default container((props, onData) => {
    Meteor.subscribe('users.user');
    Meteor.subscribe('settings.systemSettings');
    Meteor.subscribe('models.list');

    if (Roles.subscription.ready()) {
        const loggingIn = Meteor.loggingIn();
        const userId = Meteor.userId();

        onData(null, {
            loggingIn,
            authenticated: !loggingIn && !!userId
        });
    }
}, connect(mapStateToProps)(App), {loadingHandler: () => (<Loading/>)});
