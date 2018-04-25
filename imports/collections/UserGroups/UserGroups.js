import CollectionBase from '/imports/common/CollectionBase';
import Users from '../Users/Users';
import ACLPermissions from '../ACLPermissions/ACLPermissions';

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

        return super.insert(doc, callback);
    }

    /**
     * update user group
     * @param selector
     * @param modifiers
     * @param options
     * @param callback
     */
    update(selector, modifiers, options, callback) {
        modifiers.$set.users = this.usersInGroup(Meteor.user(), {}, selector);
        super.update(selector, modifiers, options, callback);
    }

    /**
     * after update group
     * @param selector
     * @param modifiers
     * @param options
     * @param resultUpdate
     */
    afterUpdate(selector, modifiers, options, resultUpdate) {
        const group = this.queryOne(Meteor.user(), selector);
        if (group && group._id) {
            this.updateUsersPermissions(Meteor.user(), group._id);
        }
    }

    /**
     * get all users in group
     * @param currentUser
     * @param usersGroup
     * @param selector
     * @param loop
     * @returns {*}
     */
    usersInGroup(currentUser, usersGroup, selector, loop = 0) {
        if (loop === 0) {
            usersGroup = {
                siblings: [],
                children: []
            };
        }

        const currentGroup = this.queryOne(currentUser, selector);
        const groupId = currentGroup && currentGroup._id || '';

        if (groupId) {
            // user in parent group
            const users = Users.query(currentUser, {groupId: groupId}).fetch();
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
            const groups = this.query(currentUser, {parent: groupId}).fetch();
            if (groups.length > 0) {
                for (let idx in groups) {
                    let group = groups[idx];
                    this.usersInGroup(currentUser, usersGroup, group._id, 1);
                }
            }
        }

        return usersGroup;
    }

    /**
     * get group permissions
     * @param currentUser
     * @param groupId
     * @returns {{}}
     */
    groupPermissions(currentUser, groupId) {
        const group = this.queryOne(currentUser, groupId);
        const roleId = group && group.roleId || '';
        if (!roleId) {
            return {};
        }

        return ACLPermissions.rolePermissions(currentUser, roleId);
    }

    /**
     * update permissions of users in group
     * @param currentUser
     * @param groupId
     */
    updateUsersPermissions(currentUser, groupId) {
        const users = Users.query(currentUser, {groupId: groupId}).fetch();
        for (let idx in users) {
            let user = users[idx];
            if (user.groupId) {
                user.permissions = this.groupPermissions(currentUser, user.groupId);
                Users.update(user._id, {$set: user});
            }
        }
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
        label: 'The date this record was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        }
    },
    name: {
        type: String,
        label: 'Name of user group',
    },
    description: {
        type: String,
        label: 'Description for user group',
        optional: true
    },
    parent: {
        type: String,
        label: 'Parent user group id',
        defaultValue: 'ROOT'
    },
    users: {
        type: Object,
        optional: true
    },
    "users.siblings": {
        type: Array,
        optional: true
    },
    "users.siblings.$": {
        type: String,
        optional: true
    },
    "users.children": {
        type: Array,
        optional: true
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
