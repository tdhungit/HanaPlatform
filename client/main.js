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
    // subscribe need ready
    const userSub = Meteor.subscribe('users.user');
    const userGroupSub = Meteor.subscribe('userGroups.forCurrentUser');
    const permissionsSub = Meteor.subscribe('aclPermissions.forCurrentUser');
    const branchSub = Meteor.subscribe('branchOffices.forCurrentUser');
    const settingSub = Meteor.subscribe('settings.list');
    const modelSub = Meteor.subscribe('models.list');
    Meteor.subscribe('notifications.list');
    // auto subscribe
    Meteor.subscribe('media.list');

    Tracker.autorun((c) => {
        if (Meteor.loggingIn() || !Roles.subscription.ready()
            || !userSub.ready() || !userGroupSub.ready() || !permissionsSub.ready()
            || !branchSub.ready() || !settingSub.ready() || !modelSub.ready()) {
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
