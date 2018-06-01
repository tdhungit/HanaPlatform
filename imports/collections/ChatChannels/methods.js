import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'underscore';
import {aclAccess} from '../Users/aclUtils';
import ChatChannels from './ChatChannels';
import Users from '../Users/Users';
import {NotificationTypes} from '../Notifications/config';
import Notifications from '../Notifications/Notifications';

Meteor.methods({
    'chatChannels.insert': function (channel) {
        // check access
        aclAccess('ChatChannels', 'Create');

        check(channel, Object);
        let fixedChannel = {...channel};
        fixedChannel.isPubic = true;
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
    'chatChannels.directMessage': function (friendId, chatting = false) {
        // check access
        aclAccess('ChatChannels', 'Create');

        if (!friendId) {
            throw new Meteor.Error('500', 'Error Params!');
        }

        const friendUser = Users.findOne(friendId);
        if (!friendUser || !friendUser._id) {
            throw new Meteor.Error('500', 'Error Friend User!');
        }

        const currentUser = Meteor.user();
        const currentUserId = currentUser._id;
        let commonChannel, channelId = '';
        // check exist channel
        const channel = ChatChannels.queryOne(currentUser, {
            userId: currentUserId,
            isPubic: false,
            users: {$elemMatch: {_id: friendId}}
        });
        if (channel) {
            commonChannel = channel;
            channelId = channel._id;
        }

        // create new channel
        if (!channelId) {
            let chatData = {
                name: `${friendUser.username}`,
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
            };

            if (chatting) {
                chatData.isActive = true;
                chatData.isChatting = true;
            }

            channelId = ChatChannels.insert(chatData);
        } else {
            if (chatting) {
                ChatChannels.update(channelId, {
                    $set: {
                        _id: channelId,
                        isActive: true,
                        isChatting: true
                    }
                });
            }
        }

        return channelId;
    },
    'chatChannels.invite': function (channelId, inviteUsers) {
        const channel = ChatChannels.queryOne(Meteor.user(), {
            _id: channelId,
            users: {$elemMatch: {_id: Meteor.userId()}}
        });

        if (!channel) {
            throw new Meteor.Error('404', 'Can not found channel');
        }

        let users = [];
        // admin can not remove
        _.each(channel.users, (user) => {
            if (user.isAdmin) {
                users.push(user);
            }
        });

        _.each(inviteUsers, (inviteUser) => {
            const posExist = _.findIndex(users, {_id: inviteUser._id});
            if (posExist < 0) {
                const pos = _.findIndex(channel.users, {_id: inviteUser._id});
                if (pos >= 0) {
                    users.push(channel.users[pos]);
                } else {
                    users.push(inviteUser);
                    // send Notification for new invite user
                    const notification = {
                        type: NotificationTypes.ChatInvite,
                        assignedId: inviteUser._id,
                        message: NotificationTypes.ChatInvite,
                        destination: channelId,
                        params: {
                            channel: channel
                        }
                    };
                    Notifications.insert(notification);
                }
            }
        });

        try {
            ChatChannels.update(channel._id, {$set: {users: users}});
        } catch (e) {
            throw new Meteor.Error('500', e);
        }
    }
});
