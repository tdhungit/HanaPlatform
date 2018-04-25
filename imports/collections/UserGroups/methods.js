import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import UserGroups from './UserGroups';
import {aclAccess} from '../Users/aclUtils';

Meteor.methods({
    'userGroups.insert': function (userGroup) {
        // check permission
        aclAccess('UserGroups', 'Create');

        check(userGroup, Object);
        if (typeof userGroup.parent !== 'undefined') {
            if (!userGroup.parent) {
                userGroup.parent = 'ROOT';
            }
        }

        return UserGroups.insert(userGroup);
    },
    'userGroups.update': function (userGroup) {
        // check permission
        aclAccess('UserGroups', 'Edit');

        check(userGroup, Object);
        if (typeof userGroup.parent !== 'undefined') {
            if (!userGroup.parent) {
                userGroup.parent = 'ROOT';
            }
        }

        try {
            const groupId = userGroup._id;
            UserGroups.update(groupId, {$set: userGroup});
            return groupId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    },
    // only root group
    'userGroups.ROOT': function () {
        const user = Meteor.user();
        return UserGroups.find({companyId: user.companyId}).fetch();
    },
    // all groups with tree data
    'userGroups.TREE': function () {
        const user = Meteor.user();
        return getTreeUserGroups(user, 'ROOT');
    }
});

/**
 * get groups with tree data
 * @param user
 * @param groupId
 * @returns {Array}
 */
function getTreeUserGroups(user, groupId) {
    let groups = [];
    const group = UserGroups.find({
        companyId: user.companyId,
        parent: groupId}).fetch();

    if (group.length > 0) {
        for (let idx in group) {
            let item = group[idx];
            // search children item
            item.children = getTreeUserGroups(user, item._id);
            groups.push(item);
        }
    }

    return groups;
}
