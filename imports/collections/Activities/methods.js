import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Activities from './Activities';

Meteor.methods({
    'activities.insert': function (activity) {
        check(activity, Object);
        return Activities.insert(activity);
    }
});
