import {Meteor} from 'meteor/meteor';
import Notifications from './Notifications';

Meteor.publish('notifications.list', function () {
    return Notifications.publish(Meteor.user(), {});
});