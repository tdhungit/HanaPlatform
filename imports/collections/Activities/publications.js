import {Meteor} from 'meteor/meteor';
import Activities from './Activities';

// init pagination
Activities.publishPagination();

Meteor.publish('activities.list', function () {
    return Activities.publish(Meteor.user());
});

Meteor.publish('activities.detail', function (activityId) {
    return Activities.publish(Meteor.user(), {_id: activityId});
});

Meteor.publish('activities.events', function (start, end) {
    return Activities.findEvents(start, end, Meteor.user());
});
