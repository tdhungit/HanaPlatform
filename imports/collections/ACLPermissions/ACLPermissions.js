import CollectionBase from '/imports/common/CollectionBase';

class PermissionsCollection extends CollectionBase {
    beforeInsert(doc) {
        const find = this.find({role: doc.role, model: doc.model}).fetch();
        if (find && find.length > 0) {
            return false;
        }

        return true;
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
    role: { // ACLRole
        type: String,
        label: 'Role name'
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
