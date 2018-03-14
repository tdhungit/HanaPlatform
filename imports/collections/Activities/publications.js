import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import Activities from './Activities';

Meteor.publish('activities.list', () => {
    return Activities.find({});
});

publishPagination(Activities, {});

Meteor.publish('activities.detail', (activityId) => {
    return Activities.find({_id: activityId});
});
