import CollectionBase from '../../common/CollectionBase';
import {activityLayouts} from './layouts';
import {ActivityInviteStatus} from './config';
import {Meteor} from 'meteor/meteor';

class ActivitiesCollection extends CollectionBase {
    /**
     * get default layouts
     */
    getLayouts() {
        return activityLayouts;
    }

    /**
     * insert data
     * @param doc
     * @param callback
     * @returns {*}
     */
    insert(doc, callback) {
        if (!doc.userId) {
            doc.userId = Meteor.userId();
        }

        return super.insert(doc, callback);
    }

    /**
     * get events in start and in
     * @param start
     * @param end
     * @param user
     * @param options
     * @returns {Mongo.Cursor}
     */
    findEvents(start, end, user = {}, options = {}) {
        if (Meteor.isClient) {
            user = Meteor.user();
        }

        return this.query(user, {
            $or: [
                {
                    $and: [
                        {dateStart: {$gte: start}},
                        {dateStart: {$lte: end}}
                    ]
                },
                {
                    $and: [
                        {dateEnd: {$gte: start}},
                        {dateEnd: {$lte: end}}
                    ]
                },
                {
                    $and: [
                        {dateStart: {$lte: start}},
                        {dateEnd: {$gte: end}},
                    ]
                }
            ]
        }, options);
    }

    /**
     * fixed filters for owner data
     * @param user if user === -1 => only get raw filter
     * @param selector
     * @param actionName
     * @returns {{}}
     */
    fixedFilters(user, selector = {}, actionName = 'View') {
        selector = super.fixedFilters(user, selector, actionName);
        selector.invites = {$elemMatch: {userId: user._id, status: {$ne: ActivityInviteStatus.No}}};
        return selector;
    }
}

const Activities = new ActivitiesCollection('activities');

Activities.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Activities.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const ActivitiesSchema = CollectionBase.schema({
    createdAt: {
        type: String,
        label: 'The date this record was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    userId: {type: String},
    name: {type: String},
    type: {type: String},
    dateStart: {type: String},
    dateEnd: {
        type: String,
        optional: true
    },
    allDay: {
        type: Boolean,
        defaultValue: false
    },
    repeat: {
        type: Object,
        optional: true
    },
    "repeat.start": {type: String},
    "repeat.end": {type: String},
    "repeat.duration": {type: Number},
    "repeat.unit": {type: String},
    "repeat.dayOfWeek": {
        type: Array,
        optional: true
    },
    "repeat.dayOfWeek.$": {
        type: Number,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    location: {
        type: String,
        optional: true
    },
    conferencing: {
        type: Object,
        optional: true
    },
    "conferencing.type": {type: String},
    "conferencing.name": {type: String},
    notifications: {
        type: Array,
        optional: true
    },
    "notifications.$": {type: Object},
    "notifications.$.type": {type: String},
    "notifications.$.duration": {type: Number},
    "notifications.$.unit": {type: String},
    invites: {
        type: Array,
        optional: true
    },
    "invites.$": {type: Object},
    "invites.$.userId": {type: String},
    "invites.$.username": {type: String},
    "invites.$.userEmail": {type: String},
    "invites.$.canEdit": {
        type: Boolean,
        defaultValue: true
    },
    "invites.$.canInvite": {
        type: Boolean,
        defaultValue: true
    },
    "invites.$.canSeeAll": {
        type: Boolean,
        defaultValue: true
    },
    "invites.$.status": {
        type: String,
        defaultValue: ActivityInviteStatus.Waiting
    }
});

Activities.attachSchema(ActivitiesSchema);

export default Activities;
