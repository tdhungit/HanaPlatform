import {Meteor} from 'meteor/meteor';
import ChatChannels from './ChatChannels';

ChatChannels.publishPagination();

Meteor.publish('chatChannels.list', function () {
    return ChatChannels.publish(Meteor.user(), {}, {limit: 100});
});

Meteor.publish('chatChannels.detail', function (channelId) {
    return ChatChannels.publish(Meteor.user(), {_id: channelId});
});
