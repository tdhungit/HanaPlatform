import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const UserGroups = new Mongo.Collection('user_groups');

UserGroups.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

UserGroups.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const UserGroupsSchema = new SimpleSchema({
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
    },
    parent: {
        type: String,
        label: 'Parent user group id',
        defaultValue: 'ROOT'
    }
});

UserGroups.attachSchema(UserGroupsSchema);

export default UserGroups;
