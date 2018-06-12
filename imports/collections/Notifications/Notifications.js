import CollectionAssign from '../../common/CollectionAssign';
import {NotificationTypes} from './config';

class NotificationsCollection extends CollectionAssign {
    fixedFilters(user, selector = {}, actionName = 'View') {
        selector.assignedId = user && user._id || '';
        return selector;
    }
}

const Notifications = new NotificationsCollection('notifications');

Notifications.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Notifications.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const Schema = {};
Schema.Notifications = CollectionAssign.schema({
    createdAt: {
        type: String,
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    type: {
        type: String,
        defaultValue: NotificationTypes.Message
    },
    message: {type: String},
    destination: {type: String},
    params: {
        type: Object,
        blackbox: true,
        optional: true
    },
    isRead: {
        type: Boolean,
        defaultValue: false
    },
    isNotify: {
        type: Boolean,
        defaultValue: true
    },
});

Notifications.attachSchema(Schema.Notifications);

export default Notifications;
