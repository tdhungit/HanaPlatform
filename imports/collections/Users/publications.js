import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import Users from './Users';

// default get user profile
Meteor.publish('users.user', function() {
    if (this.userId) {
        return Meteor.users.find(this.userId, {
            fields: {
                _id: 1,
                settings: 1
            }
        });
    }
    return this.ready();
});

// init pagination
publishPagination(Users, {
    name: 'users.paginatedList'
});

Meteor.publish('users.list', () => {
    return Users.find({});
});

Meteor.publish('users.detail', (userId) => {
    return Users.find({_id: userId});
});
