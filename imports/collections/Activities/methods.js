import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'underscore';
import Activities from './Activities';
import {aclAccess} from '../Users/aclUtils';
import {ActivityInviteStatus} from './config';
import {NotificationTypes} from '../Notifications/config';
import Notifications from '../Notifications/Notifications';

Meteor.methods({
    'activities.insert': function (activity) {
        // check permission
        aclAccess('Activities', 'Create');

        check(activity, Object);

        // activity invites
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

        const _id = Activities.insert(activity);
        if (_id) {
            activity._id = _id;
            sendNotifications('add', Meteor.user(), activity);
        }

        return _id;
    },
    'activities.update': function (activity) {
        // check permission
        aclAccess('Activities', 'Edit');

        check(activity, Object);
        try {
            const activityId = activity._id;

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

            Activities.update(activityId, {$set: activity});
            sendNotifications('edit', Meteor.user(), activity);
            return activityId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    }
});

function sendNotifications(type, user, activity) {
    const invites = activity.invites || [];
    _.each(invites, (inviteUser) => {
        if (inviteUser.userId !== user._id) {
            let message = 'You are invited to {$name} from {$username}';
            if (type === 'edit') {
                message = '{$username} edited a event {$name}';
            }

            let notify = {
                type: NotificationTypes.Message,
                assignedId: inviteUser.userId,
                message: message,
                destination: '/manager/activities/' + activity._id + '/detail',
                params: {
                    _id: activity._id,
                    name: activity.name,
                    username: user.username
                }
            };

            Notifications.insert(notify);
        }
    });
}
