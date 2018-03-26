import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import Users from './Users';

// default get user profile
Meteor.publish('users.user', function () {
    if (!this.userId) {
        return this.ready();
    }

    return Meteor.users.find(this.userId, {
        fields: {
            _id: 1,
            sysCompanyId: 1,
            settings: 1,
            group: 1,
            isAdmin: 1,
            isDeveloper: 1
        }
    });
});

// init pagination
publishPagination(Users, {
    name: 'users.paginatedList'
});

Meteor.publish('users.list', function () {
    return Users.find({});
});

Meteor.publish('users.detail', function (userId) {
    return Users.find({_id: userId});
});
