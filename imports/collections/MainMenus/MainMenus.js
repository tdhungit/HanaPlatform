import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const MainMenus = new Mongo.Collection('main_menus');

MainMenus.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

MainMenus.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const MainMenusSchema = new SimpleSchema({
    createdAt: {
        type: String,
        label: 'The date this menu was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    name: {
        type: String,
        label: 'Name of menu that will show as title',
    },
    url: {
        type: String,
        label: 'Route that need link to there',
        optional: true
    },
    icon: {
        type: String,
        label: 'Icon of menu',
    },
    title: {
        type: Boolean,
        label: 'Only title or not',
        defaultValue: false
    },
    divider: {
        type: Boolean,
        label: 'Only divider or not',
        defaultValue: false
    },
    badge: {
        type: Object,
        label: 'Badge show on right menu',
        optional: true
    },
    'badge.variant': {
        type: String,
        label: 'Badge type'
    },
    'badge.text': {
        type: String,
        label: 'Badge text'
    },
    weight: {
        type: Number,
        label: 'Use to sort menu',
        defaultValue: 0
    },
    parent: {
        type: String,
        label: 'This menu is child of parent',
        defaultValue: 'ROOT'
    }
});

MainMenus.attachSchema(MainMenusSchema);

export default MainMenus;
