import {Meteor} from 'meteor/meteor';
import Settings from './Settings';
import {aclAccess} from '../Users/aclUtils';

Meteor.methods({
    'settings.update': function (setting) {
        // check permission
        aclAccess('Settings', 'Edit');

        let updateId = '';
        if (setting && setting.category && setting.name) {
            const findUnique = Settings.findOne({category: setting.category, name: setting.name});
            if (findUnique && findUnique._id) {
                updateId = findUnique._id;
            }
        }

        if (updateId) {
            try {
                Settings.update(updateId, {$set: setting});
                return updateId;
            } catch (exception) {
                throw new Meteor.Error('500', exception);
            }
        } else {
            return Settings.insert(setting);
        }
    }
});
