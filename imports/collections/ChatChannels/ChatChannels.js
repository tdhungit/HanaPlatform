import CollectionBase from '../../common/CollectionBase';
import {Meteor} from "meteor/meteor";
import {ChatChannelUserStatus} from './config';

class ChatChannelsCollection extends CollectionBase {
    /**
     * insert record
     * @param doc
     * @param callback
     * @returns {{_id: *, name: string|*}}
     */
    insert(doc, callback) {
        if (!doc.userId) {
            doc.userId = Meteor.user()._id;
        }

        return super.insert(doc, callback);
    }

    /**
     * fixed filters owner sale orders
     * @param user
     * @param selector
     * @param actionName
     * @returns {{}}
     */
    fixedFilters(user, selector = {}, actionName = 'View') {
        selector = super.fixedFilters(user, selector, actionName);
        const userId = user && user._id || '';
        if (user && (user.isAdmin || user.isDeveloper)) {
            if (!selector.adminQuery) {
                selector.users = {$elemMatch: {_id: userId}};
            } else {
                delete selector.adminQuery;
            }
        } else {
            selector.users = {$elemMatch: {_id: userId}};
        }

        return selector;
    }
}

const ChatChannels = new ChatChannelsCollection('chat_channels');

ChatChannels.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

ChatChannels.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const ChatChannelsSchema = {};
ChatChannelsSchema.ChatChannels = CollectionBase.schema({
    createdAt: {
        type: String,
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    userId: {type: String},
    name: {
        type: String,
        required: true
    },
    description: {type: String, optional: true},
    isPubic: {type: Boolean, defaultValue: true},
    isActive: {type: Boolean, defaultValue: false},
    isChatting: {type: Boolean, defaultValue: false},
    users: {
        type: Array,
        required: true
    },
    "users.$": {type: Object},
    "users.$._id": {type: String},
    "users.$.username": {type: String},
    "users.$.status": {
        type: String,
        defaultValue: ChatChannelUserStatus.Waiting
    },
    "users.$.isAdmin": {
        type: Boolean,
        defaultValue: false
    }
});

ChatChannels.attachSchema(ChatChannelsSchema.ChatChannels);

export default ChatChannels;
