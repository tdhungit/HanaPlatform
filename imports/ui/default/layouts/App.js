import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; // or HashRouter
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {appLoading} from '../store/app/app.actions';

import container from '/imports/common/Container';
import ManagerLayout from "./ManagerLayout";
import HomeLayout from "./HomeLayout";

import Public from '../components/Router/Public';
import Authenticate from '../components/Router/Authenticate';
import {AppLoading} from '../components/Loading/Loading';

import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import RecoverPassword from '../pages/auth/RecoverPassword';
import ResetPassword from '../pages/auth/ResetPassword';

/**
 * App main layout
 */
class App extends Component {
    static propTypes = {
        loggingIn: PropTypes.bool,
        authenticated: PropTypes.bool
    };

    render() {
        const appProps = this.props;
        return (
            <Router>
                <div className="HanaPlatform">
                    {appProps.app.loading ? <AppLoading/> : null}
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

/**
 * get state from redux
 * @param state
 * @returns {{app: *|string|string|(function(*=, *))}}
 */
const mapStateToProps = (state) => {
    return {app: state.app}
};

/**
 * function set loading from redux
 * @param dispatch
 * @returns {{appLoading: appLoading}|ActionCreator<any>|ActionCreatorsMapObject}
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        appLoading: appLoading
    }, dispatch);
};

/**
 * Meteor subscribe default need data
 */
export default container((props, onData) => {
    if (Roles.subscription.ready()) {
        const loggingIn = Meteor.loggingIn();
        const userId = Meteor.userId();

        onData(null, {
            loggingIn,
            authenticated: !loggingIn && !!userId
        });
    }
}, connect(mapStateToProps, mapDispatchToProps)(App), {loadingHandler: () => (<AppLoading/>)});
