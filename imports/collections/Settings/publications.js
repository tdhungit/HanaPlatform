import {Meteor} from 'meteor/meteor';
import Settings from './Settings';

Meteor.publish('settings.list', function () {
    if (!this.userId) {
        return this.ready();
    }

    return Settings.publish(Meteor.user(), {});
});
