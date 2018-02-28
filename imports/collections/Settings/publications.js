import {Meteor} from 'meteor/meteor';
import Settings from './Settings';

Meteor.publish('settings.systemSettings', () => {
    return Settings.find({category: 'Systems'});
});

Meteor.publish('settings.getCategory', (category) => {
    let params = {};
    if (category) {
        params.category = category;
    }

    return Settings.find(params);
});

Meteor.publish('settings.getSetting', (category, name) => {
    let params = {};
    if (category) {
        params.category = category;
    }

    if (name) {
        params.name = name;
    }

    return Settings.find(params);
});
