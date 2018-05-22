import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';
import Users from '/imports/collections/Users/Users';
import {aclAccess} from './aclUtils';
import UserGroups from '../UserGroups/UserGroups';

Meteor.methods({
    'users.insert': function (user) {
        // check permission
        aclAccess('Users', 'Create');

        check(user, Object);
        if (user.username) {
            user.username = user.username + '.' + user.domain;
        }

        if (user.groupId) {
            user.permissions = UserGroups.groupPermissions(Meteor.user(), user.groupId);
        }

        Accounts.onCreateUser(function (options, user) {
            user.companyId = options.companyId;
            user.branchOffices = options.branchOffices || [''];
            user.groupId = options.groupId || '';
            user.isAdmin = options.isAdmin || false;
            user.isDeveloper = options.isDeveloper || false;
            user.emails = options.emails || [];
            user.profile = options.profile || {};
            return user;
        });
        const result = Accounts.createUser(user);

        try {
            if (user.groupId) {
                UserGroups.update(user.groupId, {$set: {
                        users: UserGroups.usersInGroup(Meteor.user(), {}, user.groupId)
                }});
            }
        } catch (exception) {
            console.log(exception);
            throw new Meteor.Error('500', exception);
        }

        return result;
    },
    'users.update': function (user) {
        // check permission
        aclAccess('Users', 'Edit');

        check(user, Object);
        let userClean = {...user};
        if (user.email) {
            userClean.emails = [{
                address: user.email,
                verified: false
            }];
        }

        try {
            const userId = user._id;
            if (user.groupId) {
                user.permissions = UserGroups.groupPermissions(Meteor.user(), user.groupId);
            }

            Users.update(userId, {$set: userClean});
            if (user.groupId) {
                UserGroups.update(user.groupId, {$set: {
                    users: UserGroups.usersInGroup(Meteor.user(), {}, user.groupId)
                }});
            }

            // set password
            if (user.password) {
                Accounts.setPassword(userId, user.password);
            }

            return userId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    },
    'users.updateAvatar': function (userId, mediaId) {
        // check permission
        aclAccess('Users', 'Edit');

        check(mediaId, String);
        const userData = {
            profile: {
                avatar: mediaId
            }
        };

        try {
            Users.update(userId, {$set: userData});
            return userId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    },
    // search user with keyword
    'users.searchKeyword': function (keyword, limit = 10) {
        check(keyword, String);
        return Users.query(Meteor.user(), {
            username: {$regex: keyword}
        }, {
            limit: limit
        }).fetch();
    }
});