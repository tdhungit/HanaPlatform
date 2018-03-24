import {Meteor} from 'meteor/meteor';
import UserGroups from './UserGroups';

Meteor.publish('userGroups.list', () => {
    return UserGroups.publish(Meteor.user(), {});
});

Meteor.publish('userGroups.detail', (groupId) => {
    return UserGroups.publish(Meteor.user(), {_id: groupId});
});
