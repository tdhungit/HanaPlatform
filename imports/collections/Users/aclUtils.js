import {Meteor} from 'meteor/meteor';
import Users from './Users';

export function aclAccess(controllerName, actionName) {
    if (Users.checkAccess(Meteor.user(), controllerName, actionName)) {
        return true;
    }

    throw new Meteor.Error('401', 'Permission Denied!');
}
