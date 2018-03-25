import {Meteor} from 'meteor/meteor';
import ACLPermissions from './ACLPermissions';

Meteor.methods({
    'aclPermissions.update': function (permissions, role) {
        for (let collection in permissions) {
            let permission = permissions[collection];
            permission.role = role;
            permission.model = collection;

            const oldPermission = ACLPermissions.findOne({role: role, model: collection});
            if (oldPermission && oldPermission._id) {
                ACLPermissions.update(oldPermission._id, {$set: permission});
            } else {
                ACLPermissions.insert(permission);
            }
        }
    }
});
