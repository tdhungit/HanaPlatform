import CollectionBase from '/imports/common/CollectionBase';
import SimpleSchema from 'simpl-schema';

class PermissionsCollection extends CollectionBase {
    beforeInsert(doc) {
        const find = this.find({role: doc.role, model: doc.model}).fetch();
        if (find && find.length > 0) {
            return false;
        }

        return true;
    }
}

const Permissions = new PermissionsCollection('acl_permissions');

Permissions.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Permissions.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const PermissionsSchema = new SimpleSchema({
    createdAt: {
        type: String,
        label: 'The date permission was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    role: {
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

Permissions.attachSchema(PermissionsSchema);

export default Permissions;
