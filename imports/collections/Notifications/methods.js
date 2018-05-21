import {Meteor} from 'meteor/meteor';
import Notifications from './Notifications';

Meteor.methods({
    'notifications.insert': function (notification) {
        return Notifications.insert(notification);
    },
    'notifications.read': function (_id, isRead) {
        try {
            Notifications.update(_id, {$set: {isRead: isRead}});
        } catch (e) {
            throw new Meteor.Error('500', e);
        }
    },
    'notifications.notified': function (_id) {
        try {
            Notifications.update(_id, {$set: {isNotify: false}});
        } catch (e) {
            throw new Meteor.Error('500', e);
        }
    }
});
