import {Meteor} from 'meteor/meteor';
import ACLPermissions from './ACLPermissions';

Meteor.methods({
    'aclPermissions.update': function (permissions, roleId) {
        for (let collection in permissions) {
            let permission = permissions[collection];
            permission.roleId = roleId;
            permission.model = collection;

            const oldPermission = ACLPermissions.findOne({roleId: roleId, model: collection});
            if (oldPermission && oldPermission._id) {
                ACLPermissions.update(oldPermission._id, {$set: permission});
            } else {
                ACLPermissions.insert(permission);
            }
        }
    }
});
