import SimpleSchema from 'simpl-schema';
import CollectionAssign from '/imports/common/CollectionAssign';

class ActivitiesCollection extends CollectionAssign {

}

const Activities = new ActivitiesCollection('activities');

const ActivitiesSchema = new SimpleSchema({
    createdAt: {
        type: String,
        label: 'The date this record was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    name: {
        type: String,
        label: 'Subject of event'
    },
    type: {
        type: String,
        label: 'Type of activity'
    },
    dateStart: {
        type: String,
        label: 'Date start of event'
    },
    dateEnd: {
        type: String,
        label: 'Date end of event',
        optional: true
    },
    repeat: {
        type: Object,
        label: 'Repeat event',
        optional: true
    },
    "repeat.duration": {
        type: Number,
        label: 'Repeat duration'
    },
    "repeat.unit": {
        type: String,
        label: 'Repeat duration unit'
    },
    "repeat.dayOfWeek": {
        type: Array,
        label: 'Days of week',
        optional: true
    },
    "repeat.dayOfWeek.$": {
        type: String,
        label: 'Day of week',
        optional: true
    },
    "repeat.end": {
        type: Object,
        label: 'Repeat end',
        optional: true
    },
    "repeat.end.date": {
        type: String,
        label: 'Repeat date end',
        optional: true
    },
    "repeat.end.times": {
        type: Number,
        label: 'Repeat max',
        optional: true
    },
    description: {
        type: String,
        label: 'Description of event',
        optional: true
    },
    location: {
        type: String,
        label: 'Location of event',
        optional: true
    },
    conferencing: {
        type: Array,
        label: 'Use conferencing',
        optional: true
    },
    "conferencing.$": {
        type: Object,
        label: 'Conferencing tool'
    },
    "conferencing.$.name": {
        type: String,
        label: 'Conferencing tool name'
    },
    notifications: {
        type: Array,
        label: 'Notifications',
        optional: true
    },
    "notifications.$": {
        type: Object,
        label: 'Notification step'
    },
    "notifications.$.type": {
        type: String,
        label: 'Notification type'
    },
    "notifications.$.duration": {
        type: Number,
        label: 'Notification duration'
    },
    "notifications.$.unit": {
        type: String,
        label: 'Notification duration unit'
    },
    invites: {
        type: Array,
        label: 'Invite users to event',
        optional: true
    },
    "invites.$": {
        type: Object,
        label: 'User invited'
    },
    "invites.$.userId": {
        type: String,
        label: 'User id invited'
    },
    "invites.$.username": {
        type: String,
        label: 'Username of user invited'
    },
    "invites.$.userEmail": {
        type: String,
        label: 'Email of user invited'
    },
    "invites.$.canEdit": {
        type: Boolean,
        label: 'User invited can edit event',
        defaultValue: true
    },
    "invites.$.canInvite": {
        type: Boolean,
        label: 'User invited can invite other user',
        defaultValue: true
    },
    "invites.$.canSeeAll": {
        type: Boolean,
        label: 'User invited can see all users in event',
        defaultValue: true
    },
});

Activities.attachSchema(ActivitiesSchema);

export default Activities;
