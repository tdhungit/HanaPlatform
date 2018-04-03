import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';
import Users from '/imports/collections/Users/Users';

Meteor.methods({
    // search user with keyword
    'users.searchKeyword': function (keyword, limit = 10) {
        check(keyword, String);
        return Users.find({
            username: {$regex: ".*" + keyword + ".*"}
        }, {
            limit: limit
        }).fetch();
    },
    'users.insert': function (user) {
        check(user, Object);
        Accounts.onCreateUser(function (options, user) {
            user.companyId = options.companyId;
            user.branchOffices = options.branchOffices || [''];
            user.groupId = options.groupId || '';
            user.isAdmin = options.isAdmin || false;
            user.isDeveloper = options.isDeveloper || false;
            return user;
        });
        return Accounts.createUser(user);
    },
    'users.update': function (user) {
        check(user, Object);
        let userClean = user;
        if (user.email) {
            userClean.emails = [{
                address: user.email,
                verified: false
            }];
        }
        try {
            const userId = user._id;
            Users.update(userId, {$set: userClean});
            return userId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    },
    'users.updateElement': function (userId, data) {
        check(data, Object);
        try {
            Users.update(userId, {$set: data});
            return userId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    },
    'users.updateAvatar': function (userId, mediaId) {
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
    }
});