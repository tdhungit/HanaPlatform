import {Meteor} from 'meteor/meteor';
import ACLPermissions from './ACLPermissions';

Meteor.publish('aclPermissions.detail', function (role) {
    return ACLPermissions.publish(Meteor.user(), {role: role});
});
