import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import Activities from './Activities';

// init pagination
publishPagination(Activities, {
    filters: {},
    dynamic_filters: function () {
        return {
            companyId: Meteor.user().companyId,
            assignedId: Meteor.userId()
        }
    }
});

Meteor.publish('activities.list', function () {
    return Activities.publish(Meteor.user());
});

Meteor.publish('activities.detail', function (activityId) {
    return Activities.publish(Meteor.user(), {_id: activityId});
});
