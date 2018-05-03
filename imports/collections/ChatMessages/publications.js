import {Meteor} from 'meteor/meteor';
import {publishComposite} from 'meteor/reywood:publish-composite';
import ChatMessages from './ChatMessages';
import Users from '../Users/Users';

publishComposite('chatMessages.list', function (channelId) {
    return {
        find: function () {
            return ChatMessages.publish(Meteor.user(), {channelId: channelId}, {limit: 100});
        },
        children: [
            {
                find: function (chat) {
                    return Users.queryOne(chat.userId);
                }
            }
        ]
    };
});
