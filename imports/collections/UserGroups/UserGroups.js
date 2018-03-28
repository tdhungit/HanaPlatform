import CollectionBase from '/imports/common/CollectionBase';
import Users from '../Users/Users';

class UserGroupsCollection extends CollectionBase {
    /**
     * insert user group
     * @param doc
     * @param callback
     */
    insert(doc, callback) {
        doc.users = {
            siblings: [],
            children: []
        };

        super.insert(doc, callback);
    }

    /**
     * update user group
     * @param selector
     * @param modifiers
     * @param options
     * @param callback
     */
    update(selector, modifiers, options, callback) {
        modifiers.$set.users = this.usersInGroup({}, selector);
        super.update(selector, modifiers, options, callback);
    }

    /**
     * get all users in group
     * @param usersGroup
     * @param selector
     * @param loop
     * @returns {*}
     */
    usersInGroup(usersGroup, selector, loop = 0) {
        if (loop === 0) {
            usersGroup = {
                siblings: [],
                children: []
            };
        }

        const currentGroup = this.findOne(selector);
        const groupId = currentGroup && currentGroup._id || '';

        if (groupId) {
            // user in parent group
            const users = Users.find({group: groupId}).fetch();
            if (users.length > 0) {
                for (let idx in users) {
                    let user = users[idx];
                    if (loop === 0) {
                        usersGroup.siblings.push(user._id);
                    } else {
                        usersGroup.children.push(user._id);
                    }
                }
            }

            // get children group
            const groups = this.find({parent: groupId}).fetch();
            if (groups.length > 0) {
                for (let idx in groups) {
                    let group = groups[idx];
                    this.usersInGroup(usersGroup, group._id, 1);
                }
            }
        }

        return usersGroup;
    }
}

const UserGroups = new UserGroupsCollection('user_groups');

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

const UserGroupsSchema = CollectionBase.schema({
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
    },
    users: {
        type: Object
    },
    "users.siblings": {
        type: Array
    },
    "users.siblings.$": {
        type: String,
        optional: true
    },
    "users.children": {
        type: Array
    },
    "users.children.$": {
        type: String,
        optional: true
    },
    roleId: {
        type: String,
        optional: true
    }
});

UserGroups.attachSchema(UserGroupsSchema);

export default UserGroups;
