import {Meteor} from 'meteor/meteor';
import Settings from './Settings';

Meteor.methods({
    'settings.update': function (setting) {
        let updateId = '';
        if (setting && setting.category && setting.name) {
            const findUnique = Settings.findOne({category: setting.category, name: setting.name});
            if (findUnique && findUnique._id) {
                updateId = findUnique._id;
            }
        }

        if (updateId) {
            return Settings.update(updateId, {$set: setting});
        } else {
            return Settings.insert(setting);
        }
    }
});
