import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'underscore';
import Activities from './Activities';
import {aclAccess} from '../Users/aclUtils';
import {ActivityInviteStatus} from './config';

Meteor.methods({
    'activities.insert': function (activity) {
        // check permission
        aclAccess('Activities', 'Create');

        check(activity, Object);

        if (!activity.invites) {
            activity.invites = [];
        }

        const pos = _.findIndex(activity.invites, {userId: Meteor.userId()});
        if (pos < 0) {
            activity.invites.push({
                userId: Meteor.userId(),
                username: Meteor.user().username,
                userEmail: Meteor.user().emails[0].address,
                canEdit: true,
                canInvite: true,
                canSeeAll: true,
                status: ActivityInviteStatus.Yes
            });
        }

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
