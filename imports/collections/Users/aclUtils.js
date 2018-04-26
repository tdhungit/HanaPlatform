import {Meteor} from 'meteor/meteor';
import Users from './Users';
import {permissionsAclDataTypes} from '../ACLPermissions/config';
import {utilsHelper} from '../../ui/default/helpers/utils/utils';

export function aclAccess(controllerName, actionName) {
    if (Users.checkAccess(Meteor.user(), controllerName, actionName)) {
        return true;
    }

    throw new Meteor.Error('401', 'Permission Denied!');
}

export function filtersBranch(user, selector, fieldName = 'branchOffices') {
    const currentBranch = user.settings && user.settings.branchOfficeId || '';
    let branchIds = [];
    if (selector[fieldName]) {
        if (typeof selector[fieldName] === 'string') {
            branchIds.push(selector[fieldName]);
        } else {
            branchIds = utilsHelper.mergeArray(branchIds, selector[fieldName]);
        }
    }

    branchIds.push(currentBranch);
    selector[fieldName] = {$in: branchIds};
    return selector;
}

export function filtersAssigned(user, modelName, actionName, selector = {}, fieldName = 'assignedId') {
    const accessType = Users.accessDataType(user, modelName, actionName);
    const listUsers = Users.childrenOfUser(user);

    let arrayUsers = [];
    if (selector[fieldName]) {
        if (typeof selector[fieldName] === 'string') {
            arrayUsers.push(selector[fieldName]);
        } else {
            arrayUsers = utilsHelper.mergeArray(arrayUsers, selector[fieldName]);
        }
    }

    if (accessType === permissionsAclDataTypes.Disable) {
        arrayUsers = [''];
    } else if (accessType === permissionsAclDataTypes.Owner) {
        arrayUsers.push(user.assignedId || '');
    } else if (accessType === permissionsAclDataTypes.Children) {
        arrayUsers = utilsHelper.mergeArray(arrayUsers, listUsers.children);
    } else if (accessType === permissionsAclDataTypes.Group) {
        arrayUsers = utilsHelper.mergeArray(arrayUsers, listUsers.siblings);
        arrayUsers = utilsHelper.mergeArray(arrayUsers, listUsers.children);
    } else if (accessType === permissionsAclDataTypes.All) {
        return selector;
    }

    selector[fieldName] = {$in: arrayUsers};
    return selector;
}
