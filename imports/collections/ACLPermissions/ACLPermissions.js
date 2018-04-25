import {Meteor} from 'meteor/meteor';
import CollectionBase from '/imports/common/CollectionBase';
import Users from '/imports/collections/Users/Users';
import UserGroups from '/imports/collections/UserGroups/UserGroups';

class PermissionsCollection extends CollectionBase {
    beforeInsert(doc) {
        const find = this.find({roleId: doc.roleId, model: doc.model}).fetch();
        if (find && find.length > 0) {
            throw new Meteor.Error('500', 'Duplicated Record');
        }

        return true;
    }

    /**
     * publication acl permission for user
     * @param selector
     * @returns {*}
     */
    publishForUser(selector) {
        let user = selector;
        const groupId = user && user.groupId || '';
        if (!groupId) {
            return false;
        }

        const group = UserGroups.queryOne(user, groupId);
        const roleId = group && group.roleId || '';
        if (!groupId) {
            return false;
        }

        return this.publish(user, {roleId: roleId});
    }

    /**
     * get role permission
     * @param currentUser
     * @param roleId
     * @returns {{}}
     */
    rolePermissions(currentUser, roleId) {
        let rolePermissions = {};
        const permissions = this.query(currentUser, {roleId: roleId}).fetch();
        for (let idx in permissions) {
            let permission = permissions[idx];
            rolePermissions[permission.model] = permission;
        }

        return rolePermissions;
    }
}

const ACLPermissions = new PermissionsCollection('acl_permissions');

ACLPermissions.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

ACLPermissions.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const PermissionsSchema = CollectionBase.schema({
    createdAt: {
        type: String,
        label: 'The date permission was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    roleId: { // ACLRole
        type: String,
        label: 'Role ID'
    },
    model: {
        type: String,
        label: 'Model|Module name'
    },
    Actions: {
        type: Object,
        blackbox: true,
        optional: true
    },
    Access: {
        type: Boolean,
        label: 'Access On or Off',
        defaultValue: false
    },
    View: {
        type: String,
        label: 'Action View',
        defaultValue: 'All'
    },
    Create: {
        type: String,
        label: 'Action Create',
        defaultValue: 'All'
    },
    Edit: {
        type: String,
        label: 'Action Edit',
        defaultValue: 'All'
    },
    Approve: {
        type: String,
        label: 'Action Approve',
        defaultValue: 'All'
    },
    Delete: {
        type: String,
        label: 'Action Delete',
        defaultValue: 'All'
    },
});

ACLPermissions.attachSchema(PermissionsSchema);

export default ACLPermissions;
