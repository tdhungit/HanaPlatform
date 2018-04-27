import {Meteor} from 'meteor/meteor';
import ChatMessages from './ChatMessages';

Meteor.publish('chatMessages.list', function (channelId) {
    return ChatMessages.publish(Meteor.user(), {channelId: channelId}, {limit: 100});
});
