import {Meteor} from 'meteor/meteor';
import UserGroups from './UserGroups';

Meteor.publish('userGroups.list', () => {
    return UserGroups.find({});
});

Meteor.publish('userGroups.detail', (groupId) => {
    return UserGroups.find({_id: groupId});
});
