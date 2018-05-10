import {Meteor} from 'meteor/meteor';
import ChatChannels from './ChatChannels';
import _ from 'underscore';

ChatChannels.publishPagination();

Meteor.publish('chatChannels.list', function () {
    return ChatChannels.publish(Meteor.user(), {}, {limit: 100});
});

Meteor.publish('chatChannels.detail', function (channelId) {
    return ChatChannels.publish(Meteor.user(), {_id: channelId});
});

Meteor.publish('chatChannels.detailActive', function (channelId) {
    const channel = ChatChannels.queryOne(Meteor.user(), {_id: channelId});
    if (!channel) {
        return this.ready();
    }

    const pos = _.findLastIndex(channel.users, {_id: Meteor.userId(), status: 'Active'});
    if (pos >= 0) {
        return ChatChannels.publish(Meteor.user(), {_id: channelId});
    }

    return this.ready();
});
