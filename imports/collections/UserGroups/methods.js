import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import UserGroups from './UserGroups';

Meteor.methods({
    'userGroups.insert': function (userGroup) {
        check(userGroup, Object);
        if (typeof userGroup.parent != 'undefined') {
            if (!userGroup.parent) {
                userGroup.parent = 'ROOT';
            }
        }

        return UserGroups.insert(userGroup);
    },
    'userGroups.update': function (userGroup) {
        check(userGroup, Object);
        if (typeof userGroup.parent != 'undefined') {
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
    'userGroups.ROOT': function () {
        return UserGroups.find({}).fetch();
    },
    'userGroups.TREE': function () {
        return getTreeUserGroups('ROOT');
    }
});

function getTreeUserGroups(groupId) {
    let groups = [];
    const group = UserGroups.find({parent: groupId}).fetch();
    if (group.length > 0) {
        for (let idx in group) {
            let item = group[idx];
            // search children item
            item.children = getTreeUserGroups(item._id);
            groups.push(item);
        }
    }

    return groups;
}
