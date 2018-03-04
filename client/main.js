import React from 'react';
import {render} from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Roles} from 'meteor/alanning:roles';

import '/public/css/style.min.css';
import '/imports/scss/style.scss';

import App from '../imports/ui/default/layouts/App';

Meteor.startup(() => {
    Tracker.autorun((c) => {
        const userSub = Meteor.subscribe('users.user');
        const settingSub = Meteor.subscribe('settings.systemSettings');
        const modelSub = Meteor.subscribe('models.list');

        const loading = userSub.ready()
            && Roles.subscription.ready()
            && settingSub.ready()
            && modelSub.ready();

        if (!loading) {
            return;
        }

        c.stop();
        Meteor.defer(() => render(<App/>, document.getElementById('PenguinPlatformContainer')));
    });
});
