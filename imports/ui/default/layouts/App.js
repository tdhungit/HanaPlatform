import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Roles} from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {appLoading, appSetVar} from '../store/app/app.actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import container from '/imports/common/Container';
import ManagerLayout from "./ManagerLayout";
import HomeLayout from "./HomeLayout";

import Public from '../components/Router/Public';
import Authenticate from '../components/Router/Authenticate';
import {AppLoading} from '../components/Loading/Loading';

import Install from '../pages/index/Install';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import RecoverPassword from '../pages/auth/RecoverPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import WidgetChatComponent from '../pages/chats/WidgetChatComponent';

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
                        <Public exact path="/install" component={Install} {...appProps}/>
                        <Public exact path="/signup" component={Signup} {...appProps}/>
                        <Public exact path="/login" component={Login} {...appProps}/>
                        <Route exact path="/recover-password" component={RecoverPassword}/>
                        <Route exact path="/reset-password/:token" component={ResetPassword}/>

                        <Authenticate path="/manager" component={ManagerLayout} {...appProps}/>
                        <Authenticate path="/" component={HomeLayout} {...appProps}/>
                    </Switch>

                    <WidgetChatComponent/>

                    <ToastContainer
                        position="bottom-right"
                        autoClose={6000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover/>
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
        appLoading: appLoading,
        appSetVar: appSetVar
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
