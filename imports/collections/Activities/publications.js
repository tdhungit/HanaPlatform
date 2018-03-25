import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import Activities from './Activities';

Meteor.publish('activities.list', function () {
    return Activities.publish(Meteor.user());
});

publishPagination(Activities, {
    filters: {},
    dynamic_filters: function () {
        return {
            sysCompanyId: Meteor.user().sysCompanyId,
            assignedId: Meteor.userId()
        }
    }
});

Meteor.publish('activities.detail', function (activityId) {
    return Activities.publish(Meteor.user(), {_id: activityId});
});
