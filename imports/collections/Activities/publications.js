import {Meteor} from 'meteor/meteor';
import Activities from './Activities';

Meteor.publish('activities.list', () => {
    return Activities.find({});
});

Meteor.publish('activities.detail', (activityId) => {
    return Activities.find({_id: activityId});
});
