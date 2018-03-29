import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import ACLRoles from './ACLRoles';

publishPagination(ACLRoles, {
    filters: {},
    dynamic_filters: function () {
        return {
            companyId: Meteor.user().companyId
        }
    }
});

Meteor.publish('aclRoles.list', function () {
    return ACLRoles.publish(Meteor.user());
});

Meteor.publish('aclRoles.detail', function (roleId) {
    return ACLRoles.publish(Meteor.user(), {_id: roleId});
});
