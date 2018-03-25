import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import ACLRoles from './ACLRoles';

Meteor.publish('aclRoles.list', function () {
    return ACLRoles.publish(Meteor.user());
});

publishPagination(ACLRoles, {
    filters: {},
    dynamic_filters: function () {
        return {
            sysCompanyId: Meteor.user().sysCompanyId
        }
    }
});

Meteor.publish('aclRoles.detail', function (roleId) {
    return ACLRoles.publish(Meteor.user(), {_id: roleId});
});
