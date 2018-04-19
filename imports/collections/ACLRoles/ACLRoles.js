import CollectionBase from '/imports/common/CollectionBase';
import {aclRoleLayouts} from './layouts';

class ACLRolesCollection extends CollectionBase {
    /**
     * get default layouts
     */
    getLayouts() {
        return aclRoleLayouts;
    }
}

const ACLRoles = new ACLRolesCollection('acl_roles');

ACLRoles.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

ACLRoles.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const ACLRolesSchema = CollectionBase.schema({
    createdAt: {
        type: String,
        label: 'The date this menu was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    name: {
        type: String,
        label: 'Name of user group',
    },
    description: {
        type: String,
        label: 'Description for user group'
    }
});

ACLRoles.attachSchema(ACLRolesSchema);

export default ACLRoles;
