import {Meteor} from 'meteor/meteor';
import ACLPermissions from './ACLPermissions';
import {aclAccess} from '../Users/aclUtils';
import ACLRoles from '../ACLRoles/ACLRoles';
import UserGroups from '../UserGroups/UserGroups';

Meteor.methods({
    'aclPermissions.update': function (aclData, aclActions, roleId) {
        // check permission
        aclAccess('ACL', 'Edit');

        // update data permissions
        const currentUser = Meteor.user();
        for (let collection in aclData) {
            let permission = aclData[collection];
            permission.roleId = roleId;
            permission.model = collection;

            const oldPermission = ACLPermissions.queryOne(currentUser, {roleId: roleId, model: collection});
            if (oldPermission && oldPermission._id) {
                ACLPermissions.update(oldPermission._id, {$set: permission});
            } else {
                ACLPermissions.insert(permission);
            }
        }

        // update actions permissions
        for (let controllerName in aclActions) {
            let aclAction = aclActions[controllerName];
            let permission = {
                roleId: roleId,
                model: controllerName,
                Actions: aclAction
            };

            const oldPermission = ACLPermissions.queryOne(currentUser, {roleId: roleId, model: controllerName});
            if (oldPermission && oldPermission._id) {
                ACLPermissions.update(oldPermission._id, {$set: permission});
            } else {
                ACLPermissions.insert(permission);
            }
        }

        // update users permissions
        const role = ACLRoles.queryOne(currentUser, roleId);
        if (role && role._id) {
            const groups = UserGroups.query(currentUser, {roleId: role._id}).fetch();
            for (let idx in groups) {
                let group = groups[idx];
                UserGroups.updateUsersPermissions(currentUser, group._id);
            }
        }
    }
});
