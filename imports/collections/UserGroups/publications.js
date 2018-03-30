import {Meteor} from 'meteor/meteor';
import UserGroups from './UserGroups';

Meteor.publish('userGroups.list', function () {
    return UserGroups.publish(Meteor.user(), {});
});

Meteor.publish('userGroups.detail', function (groupId) {
    return UserGroups.publish(Meteor.user(), {_id: groupId});
});

Meteor.publish('userGroups.forCurrentUser', function () {
    if (this.userId) {
        return UserGroups.publish(Meteor.user(), {_id: Meteor.user().groupId});
    }

    return this.ready();
});
