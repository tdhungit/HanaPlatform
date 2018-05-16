import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import SimpleSchema from 'simpl-schema';
import UserGroups from '../UserGroups/UserGroups';
import ACLPermissions from '../ACLPermissions/ACLPermissions';
import {userLayouts} from './layouts';
import {permissionsAclDataTypes} from '../ACLPermissions/config';
import {modulesComponent} from '../../config/config.inc';

const Users = Meteor.users;

Users.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Users.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

const Schema = {};

// schema of user country field
Schema.UserCountry = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        regEx: /^[A-Z]{2}$/
    }
});

// schema of user profile field
Schema.UserProfile = new SimpleSchema({
    avatar: {
        type: String,
        defaultValue: ''
    },
    firstName: {
        type: String,
        defaultValue: ''
    },
    lastName: {
        type: String,
        defaultValue: ''
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    organization: {
        type: String,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
    country: {
        type: Schema.UserCountry,
        optional: true
    }
});

// user collection schema
Schema.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean,
        defaultValue: false
    },
    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    registered_emails: {
        type: Array,
        optional: true
    },
    'registered_emails.$': {
        type: Object,
        blackbox: true
    },
    createdAt: {
        type: String,
        label: 'The date this menu was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    },
    // settings of each user
    settings: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // user must have a company
    companyId: {
        type: String,
        required: true
    },
    // user have many branch offices
    branchOffices: {
        type: Array,
        required: true
    },
    "branchOffices.$": {
        type: String
    },
    // user group
    // user group for access data
    // relate with UserGroup Collection
    groupId: {
        type: String,
        label: 'Group ID',
        required: true
    },
    permissions: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // user is admin
    isBranchManager: {
        type: Boolean,
        defaultValue: false
    },
    isAdmin: {
        type: Boolean,
        defaultValue: false
    },
    isDeveloper: {
        type: Boolean,
        defaultValue: false
    }
});

Users.attachSchema(Schema.User);

Users.getLayouts = () => {return userLayouts};

/**
 * get filter user
 * @param user
 * @param filters
 * @returns {{}}
 */
Users.filterOwnerData = (user, filters = {}) => {
    let selector = {};
    if (typeof filters === 'string') {
        selector._id = filters;
    } else {
        selector = {...filters};
    }

    if (user !== -1) {
        selector.companyId = user && user.companyId || '';
    }

    return selector;
};

/**
 * find one user
 * @param userSelector
 * @param options
 * @returns {any}
 */
Users.getOne = (userSelector = {}, options = {}) => {
    let selector = Users.filterOwnerData(-1, userSelector);
    if (Meteor.isClient) {
        selector = Users.filterOwnerData(Meteor.user(), selector);
    }

    return Users.findOne(selector, options);
};

/**
 * find users
 * @param userSelector
 * @param options
 * @returns {Mongo.Cursor}
 */
Users.getAll = (userSelector = {}, options = {}) => {
    let selector = Users.filterOwnerData(-1, userSelector);
    if (Meteor.isClient) {
        selector = Users.filterOwnerData(Meteor.user(), selector);
    }

    return Users.find(selector, options);
};

/**
 * find users
 * @param user
 * @param userSelector
 * @param options
 * @returns {Mongo.Cursor}
 */
Users.query = (user, userSelector = {}, options = {}) => {
    const selector = Users.filterOwnerData(user, userSelector);
    return Users.find(selector, options);
};

/**
 * fine one user
 * @param user
 * @param userSelector
 * @param options
 * @returns {any}
 */
Users.queryOne = (user, userSelector = {}, options = {}) => {
    const selector = Users.filterOwnerData(user, userSelector);
    return Users.findOne(selector, options);
};

/**
 * users pagination server side
 */
Users.publishPagination = () => {
    publishPagination(Users, {
        filters: {},
        dynamic_filters: function () {
            return Users.filterOwnerData(Meteor.user(), {});
        }
    });
};

/**
 * get client pagination
 * @param options
 * @returns {PaginationFactory|*}
 */
Users.pagination = (options = {}) => {
    const limit = Users.getLimit();

    const selector = options && options.filters || {};
    const filters = Users.filterOwnerData(Meteor.user(), selector);

    return new Meteor.Pagination(Users, {
        filters: filters,
        sort: options && options.sort || {},
        perPage: limit,
        reactive: true,
        debug: false
    });
};

/**
 * get limit for users list
 * @returns {number}
 */
Users.getLimit = () => {return 20};

/**
 * get all user child of this user
 * @param selector userId or current user
 * @returns {{}}
 */
Users.childrenOfUser = (selector) => {
    if (!selector) {
        return {siblings: [], children: []};
    }

    let user = selector;
    if (typeof selector === 'string') {
        user = Users.getOne(selector);
    }

    const groupId = user && user.groupId || '';
    if (!groupId) {
        return {siblings: [], children: []};
    }

    const group = UserGroups.queryOne(user, groupId);
    return group.users || {siblings: [], children: []};
};

/**
 * get user permissions
 * @param selector
 * @returns {{}}
 */
Users.userPermissions = (selector) => {
    if (!selector) {
        return {};
    }

    let user = selector;
    if (typeof selector === 'string') {
        user = Users.getOne(selector);
    }

    const groupId = user && user.groupId || '';
    return UserGroups.groupPermissions(user, groupId);
};

/**
 * check access of this user
 * @param selector user id or current user
 * @param controllerName
 * @param actionName
 * @returns {boolean}
 */
Users.checkAccess = (selector, controllerName, actionName) => {
    if (!selector) {
        return false;
    }

    let user = selector;
    if (typeof selector === 'string') {
        user = Users.getOne(selector);
    }

    if (!user || !user._id) {
        throw new Meteor.Error('401', 'Permission Denied!');
    }

    // check admin user
    if (user.isDeveloper || user.isAdmin
        || !controllerName || !actionName) {
        return true;
    }

    // check admin controller
    const adminControllers = modulesComponent.adminControllers;
    if (adminControllers[controllerName]) {
        if (adminControllers[controllerName] === 1) {
            return false;
        }

        if (adminControllers[controllerName][actionName]) {
            return false;
        }
    }

    // check permissions
    const permissions = Users.userPermissions(user);
    if (!permissions[controllerName]) {
        return true;
    }

    return permissions[controllerName][actionName] || true;
};

/**
 * get acl access data type
 * @param selector
 * @param modelName
 * @param actionName
 * @returns {*}
 */
Users.accessDataType = (selector, modelName, actionName) => {
    if (!selector) {
        return false;
    }

    let user = selector;
    if (typeof selector === 'string') {
        user = Users.getOne(selector);
    }

    if (user.isDeveloper) {
        return permissionsAclDataTypes.All;
    }

    if (user.isAdmin) {
        return permissionsAclDataTypes.All;
    }

    const permissions = Users.userPermissions(user);
    if (!permissions[modelName]) {
        return permissionsAclDataTypes.All;
    }

    return permissions[modelName][actionName] || permissionsAclDataTypes.All;
};

export default Users;
