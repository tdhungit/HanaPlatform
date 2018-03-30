import {Meteor} from 'meteor/meteor';
import Users from './Users';

// init pagination
Users.publishPagination();

// default get user profile
Meteor.publish('users.user', function () {
    if (!this.userId) {
        return this.ready();
    }

    return Meteor.users.find(this.userId, {
        fields: {
            _id: 1,
            companyId: 1,
            branchOffices: 1,
            groupId: 1,
            isAdmin: 1,
            isDeveloper: 1,
            settings: 1
        }
    });
});

Meteor.publish('users.list', function () {
    return Users.find({});
});

Meteor.publish('users.detail', function (userId) {
    return Users.find({_id: userId});
});
