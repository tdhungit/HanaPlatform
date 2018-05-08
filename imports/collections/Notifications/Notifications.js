import CollectionAssign from '../../common/CollectionAssign';

class NotificationsCollection extends CollectionAssign {

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
        defaultValue: "Message"
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
    }
});

Notifications.attachSchema(Schema.Notifications);

export default Notifications;
