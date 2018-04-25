import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import ACLRoles from './ACLRoles';
import {aclAccess} from '../Users/aclUtils';

Meteor.methods({
    'aclRoles.insert': function (role) {
        // check permission
        aclAccess('ACL', 'Create');

        check(role, Object);
        return ACLRoles.insert(role);
    },
    'aclRoles.update': function (role) {
        // check permission
        aclAccess('ACL', 'Edit');

        check(role, Object);
        try {
            const roleId = role;
            ACLRoles.update(roleId, {$set: role});
            return roleId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    }
});
