import {Meteor} from 'meteor/meteor';
import Settings from './Settings';

Meteor.publish('settings.list', () => {
    return Settings.find({});
});
