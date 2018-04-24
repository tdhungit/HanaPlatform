import {Meteor} from 'meteor/meteor';
import ACLPermissions from './ACLPermissions';

Meteor.methods({
    'aclPermissions.update': function (aclData, aclActions, roleId) {
        for (let collection in aclData) {
            let permission = aclData[collection];
            permission.roleId = roleId;
            permission.model = collection;

            const oldPermission = ACLPermissions.findOne({roleId: roleId, model: collection});
            if (oldPermission && oldPermission._id) {
                ACLPermissions.update(oldPermission._id, {$set: permission});
            } else {
                ACLPermissions.insert(permission);
            }
        }

        for (let controllerName in aclActions) {
            let aclAction = aclActions[controllerName];
            let permission = {
                roleId: roleId,
                model: controllerName,
                Actions: aclAction
            };

            const oldPermission = ACLPermissions.findOne({roleId: roleId, model: controllerName});
            if (oldPermission && oldPermission._id) {
                ACLPermissions.update(oldPermission._id, {$set: permission});
            } else {
                ACLPermissions.insert(permission);
            }
        }
    }
});
