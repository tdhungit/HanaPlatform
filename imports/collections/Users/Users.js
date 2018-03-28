import {Meteor} from 'meteor/meteor';
import CollectionBase from '/imports/common/CollectionBase';
import SimpleSchema from 'simpl-schema';
import UserGroups from '../UserGroups/UserGroups';
import ACLPermissions from '../ACLPermissions/ACLPermissions';

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
Schema.User = CollectionBase.schema({
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
        type: Boolean
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
    // user group
    // user group for access data
    // relate with UserGroup Collection
    groupId: {
        type: String,
        label: 'Group ID',
        required: true
    },
    // user is admin
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
        const userId = selector;
        user = Users.findOne(userId);
    }

    const groupId = user && user.groupId || '';
    if (!groupId) {
        return {siblings: [], children: []};
    }

    const group = UserGroups.findOne(groupId);
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
        const userId = selector;
        user = Users.findOne(userId);
    }

    const groupId = user && user.groupId || '';
    if (!groupId) {
        return {};
    }

    const group = UserGroups.findOne(groupId);
    const roleId = group && group.roleId || '';
    if (!roleId) {
        return {};
    }

    return ACLPermissions.rolePermissions(roleId);
};

/**
 * check access of this user
 * @param userId user id or current user
 * @returns {boolean}
 */
Users.checkAccess = (selector) => {
    if (!selector) {
        return false;
    }

    let user = selector;
    if (typeof selector === 'string') {
        const userId = selector;
        user = Users.findOne(userId);
    }

    if (user.isDeveloper) {
        return true;
    }

    if (user.isAdmin) {
        return true
    }

    return false;
};

export default Users;
