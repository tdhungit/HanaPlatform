import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import Users from './Users';

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

Meteor.publish('users.list', () => {
    Users.find();
});

publishPagination(Users, {
    name: 'users.paginatedList'
});

Meteor.publish('users.detail', (userId) => {
    return Meteor.users.find({_id: userId});
});
