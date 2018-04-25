import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Activities from './Activities';
import {aclAccess} from '../Users/aclUtils';

Meteor.methods({
    'activities.insert': function (activity) {
        // check permission
        aclAccess('Activities', 'Create');

        check(activity, Object);
        return Activities.insert(activity);
    },
    'activities.update': function (activity) {
        // check permission
        aclAccess('Activities', 'Edit');

        check(activity, Object);
        try {
            const activityId = activity._id;
            Activities.update(activityId, {$set: activity});
            return activityId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    }
});
