import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import Activities from './Activities';

Meteor.publish('activities.list', () => {
    return Activities.publish(Meteor.user());
});

publishPagination(Activities, {
    filters: {
        // sysCompanyId: Meteor.user().sysCompanyId,
        // assignedId: Meteor.userId()
    }
});

Meteor.publish('activities.detail', (activityId) => {
    return Activities.publish(Meteor.user(), {_id: activityId});
});
