import {Meteor} from 'meteor/meteor';
import ACLPermissions from './ACLPermissions';

Meteor.publish('aclPermissions.forCurrentUser', function () {
    const Cursor = ACLPermissions.publishForUser(Meteor.user());
    if (Cursor === false) {
        return this.ready();
    }

    return Cursor;
});

Meteor.publish('aclPermissions.detail', function (roleId) {
    return ACLPermissions.publish(Meteor.user(), {roleId: roleId});
});
