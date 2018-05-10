import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'underscore';
import {aclAccess} from '../Users/aclUtils';
import ChatChannels from './ChatChannels';
import Users from '../Users/Users';

Meteor.methods({
    'chatChannels.insert': function (channel) {
        // check access
        aclAccess('ChatChannels', 'Create');

        check(channel, Object);
        let fixedChannel = {...channel};
        fixedChannel.userId = Meteor.userId();
        if (!fixedChannel.users) {
            fixedChannel.users = [];
        }

        fixedChannel.users.push({
            _id: Meteor.userId(),
            username: Meteor.user().username,
            isAdmin: true,
            status: 'Active'
        });

        return ChatChannels.insert(fixedChannel);
    },
    'chatChannels.update': function (channel) {
        // check access
        aclAccess('ChatChannels', 'Edit');

        check(channel, Object);
        try {
            const channelId = channel._id;
            ChatChannels.update(channelId, {$set: channel});
            return channelId;
        } catch (e) {
            throw new Meteor.Error('500', e);
        }
    },
    'chatChannels.directMessage': function (friendId) {
        // check access
        aclAccess('ChatChannels', 'Create');

        if (!friendId) {
            throw new Meteor.Error('500', 'Error Params!');
        }

        const friendUser = Users.queryOne(friendId);
        if (!friendUser || !friendUser._id) {
            throw new Meteor.Error('500', 'Error Friend User!');
        }

        const currentUser = Meteor.user();
        const currentUserId = currentUser._id;
        let commonChannel, channelId = '';
        // check exist channel
        const channels = ChatChannels.query(currentUser, {userId: currentUserId}).fetch();
        if (channels.length > 0) {
            channels.forEach((channel) => {
                if (channel.users && channel.users[friendId]) {
                    commonChannel = channel;
                    channelId = channel._id;
                }
            });
        }

        // create new channel
        if (!channelId) {
            channelId = ChatChannels.insert({
                name: `${currentUser.username} and ${friendUser.username}`,
                description: 'Direct Message',
                userId: currentUserId,
                isPubic: false,
                users: [
                    {
                        _id: currentUserId,
                        username: currentUser.username,
                        isAdmin: true,
                        status: 'Active'
                    },
                    {
                        _id: friendId,
                        username: friendUser.username,
                        status: 'Active'
                    }
                ]
            });
        }

        return channelId;
    },
    'chatChannels.invite': function(channelId, inviteUsers) {
        const channel = ChatChannels.queryOne(Meteor.user(), {
            _id: channelId,
            users: {$elemMatch: {_id: Meteor.userId()}}
        });

        if (!channel) {
            throw new Meteor.Error('404', 'Can not found channel');
        }

        let users = [];
        _.each(inviteUsers, (user) => {
            let pos = _.findLastIndex(channel.users, {_id: user._id});
            if (pos >= 0) {
                users.push(channel.users[pos]);
            } else {
                users.push(user);
            }
        });

        try {
            ChatChannels.update(channel._id, {$set: {users: users}});
        } catch (e) {
            throw new Meteor.Error('500', e);
        }
    }
});
