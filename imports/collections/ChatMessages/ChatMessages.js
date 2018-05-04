import CollectionBase from '../../common/CollectionBase';

class ChatMessagesCollection extends CollectionBase {

}

const ChatMessages = new ChatMessagesCollection('chat_messages');

ChatMessages.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

ChatMessages.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const ChatMessagesSchema = {};
ChatMessagesSchema.ChatMessages = CollectionBase.schema({
    createdAt: {
        type: String,
        label: 'The date this record was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    channelId: {type: String, optional: true},
    userId: {type: String},
    type: {type: String, defaultValue: 'text'},
    message: {type: String},
});

ChatMessages.attachSchema(ChatMessagesSchema.ChatMessages);

export default ChatMessages;
