import {Meteor} from 'meteor/meteor';
import Permissions from './Permissions';

Meteor.publish('permissions.detail', (role) => {
    return Permissions.find({role: role});
});
