import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';
import Users from '/imports/collections/Users/Users';

Meteor.methods({
    'users.searchKeyword': (keyword, limit = 10) => {
        check(keyword, String);
        return Users.find({
                username: {$regex: ".*" + keyword + ".*"}
            }, {
                limit: limit
            }).fetch();
    },
    'users.insert': (user) => {
        check(user, Object);
        return Accounts.createUser(user);
    },
    'users.update': (user) => {
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
    'users.updateAvatar': (userId, mediaId) => {
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