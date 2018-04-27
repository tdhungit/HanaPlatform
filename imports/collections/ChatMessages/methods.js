import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {aclAccess} from '../Users/aclUtils';
import ChatMessages from './ChatMessages';

Meteor.methods({
    'chatMessages.insert': function (chat) {
        // check access
        aclAccess('ChatMessages', 'Create');

        check(chat, Object);
        let fixedChat = {...chat};
        fixedChat.userId = Meteor.userId();
        return ChatMessages.insert(fixedChat);
    }
});