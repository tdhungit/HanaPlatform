import React from 'react';
import {render} from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Roles} from 'meteor/alanning:roles';
import {Provider} from 'react-redux'

import '/public/css/style.min.css';
import '/imports/scss/style.scss';

import store from '../imports/ui/default/store';
import App from '../imports/ui/default/layouts/App';

Meteor.startup(() => {
    const userSub = Meteor.subscribe('users.user');
    const settingSub = Meteor.subscribe('settings.list');
    const modelSub = Meteor.subscribe('models.list');

    Tracker.autorun((c) => {
        if (Meteor.loggingIn() || !Roles.subscription.ready()
            || !userSub.ready() || !settingSub.ready() || !modelSub.ready()) {
            return;
        }

        c.stop();
        Meteor.defer(() => render((
            <Provider store={store}>
                <App/>
            </Provider>
        ), document.getElementById('HanaPlatformContainer')));
    });
});
