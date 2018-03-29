import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import Users from './Users';

// init pagination
publishPagination(Users, {
    filters: {},
    dynamic_filters: function () {
        return {
            companyId: Meteor.user().companyId
        }
    }
});

// default get user profile
Meteor.publish('users.user', function () {
    if (!this.userId) {
        return this.ready();
    }

    return Meteor.users.find(this.userId, {
        fields: {
            _id: 1,
            companyId: 1,
            settings: 1,
            groupId: 1,
            isAdmin: 1,
            isDeveloper: 1
        }
    });
});

Meteor.publish('users.list', function () {
    return Users.find({});
});

Meteor.publish('users.detail', function (userId) {
    return Users.find({_id: userId});
});
