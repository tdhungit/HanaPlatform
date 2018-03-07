import React from 'react';
import {render} from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Roles} from 'meteor/alanning:roles';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import '/public/css/style.min.css';
import '/imports/scss/style.scss';

import {appReducer} from '../imports/ui/default/reducers';
import App from '../imports/ui/default/layouts/App';

const store = createStore(appReducer, applyMiddleware(thunk));

Meteor.startup(() => {
    Tracker.autorun((c) => {
        if (Meteor.loggingIn() || !Roles.subscription.ready()) {
            return;
        }

        c.stop();
        Meteor.defer(() => render((
            <Provider store={store}>
                <App/>
            </Provider>
        ), document.getElementById('PenguinPlatformContainer')));
    });
});
