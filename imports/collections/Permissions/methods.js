import {Meteor} from 'meteor/meteor';
import Permissions from './Permissions';

Meteor.methods({
    'permissions.update': function (permissions, role) {
        for (let collection in permissions) {
            let permission = permissions[collection];
            permission.role = role;
            permission.model = collection;

            const oldPermission = Permissions.findOne({role: role, model: collection});
            if (oldPermission && oldPermission._id) {
                Permissions.update(oldPermission._id, {$set: permission});
            } else {
                Permissions.insert(permission);
            }
        }
    }
});
