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
        if (Meteor.loggingIn() || !Roles.subscription.ready()) {
            return;
        }

        c.stop();
        Meteor.defer(() => render(<App/>, document.getElementById('PenguinPlatformContainer')));
    });
});
