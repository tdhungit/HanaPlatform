import {Meteor} from 'meteor/meteor';
import ACLPermissions from './ACLPermissions';

Meteor.publish('aclPermissions.detail', function (roleId) {
    return ACLPermissions.publish(Meteor.user(), {roleId: roleId});
});
