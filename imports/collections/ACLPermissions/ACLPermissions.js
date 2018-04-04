import CollectionBase from '/imports/common/CollectionBase';
import Users from '/imports/collections/Users/Users';
import UserGroups from '/imports/collections/UserGroups/UserGroups';

class PermissionsCollection extends CollectionBase {
    beforeInsert(doc) {
        const find = this.find({role: doc.role, model: doc.model}).fetch();
        if (find && find.length > 0) {
            return false;
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
        if (typeof selector === 'string') {
            const userId = selector;
            user = Users.getOne(userId);
        }

        const groupId = user && user.groupId || '';
        if (!groupId) {
            return false;
        }

        const group = UserGroups.findOne(groupId);
        const roleId = group && group.roleId || '';
        if (!groupId) {
            return false;
        }

        return ACLPermissions.publish(user, {roleId: roleId});
    }

    /**
     * get role permission
     * @param roleId
     * @returns {{}}
     */
    rolePermissions(roleId) {
        let rolePermissions = {};
        const permissions = this.find({roleId: roleId}).fetch();
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
        label: 'Model name'
    },
    Access: {
        type: Boolean,
        label: 'Access On or Off',
        defaultValue: false
    },
    View: {
        type: String,
        label: 'Action View',
        defaultValue: 'Disable'
    },
    Create: {
        type: String,
        label: 'Action Create',
        defaultValue: 'Disable'
    },
    Edit: {
        type: String,
        label: 'Action Edit',
        defaultValue: 'Disable'
    },
    Approve: {
        type: String,
        label: 'Action Approve',
        defaultValue: 'Disable'
    },
    Delete: {
        type: String,
        label: 'Action Delete',
        defaultValue: 'Disable'
    },
});

ACLPermissions.attachSchema(PermissionsSchema);

export default ACLPermissions;
