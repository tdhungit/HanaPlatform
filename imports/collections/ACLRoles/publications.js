import {Meteor} from 'meteor/meteor';
import ACLRoles from './ACLRoles';

ACLRoles.publishPagination();

Meteor.publish('aclRoles.list', function () {
    return ACLRoles.publish(Meteor.user());
});

Meteor.publish('aclRoles.detail', function (roleId) {
    return ACLRoles.publish(Meteor.user(), {_id: roleId});
});
