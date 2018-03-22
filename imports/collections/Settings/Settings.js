import CollectionBase from '/imports/common/CollectionBase';
import SimpleSchema from 'simpl-schema';

class SettingsCollection extends CollectionBase {
    /**
     * get system setting
     * @returns {{}}
     */
    getSystemSettings() {
        const settings = this.find({category: 'Systems'}).fetch();
        let systemSettings = {};
        for (let idx in settings) {
            let setting = settings[idx];
            systemSettings[setting.name] = setting;
        }
        return systemSettings;
    }

    /**
     * get settings from category and name
     * @param category
     * @param name
     * @returns {any}
     */
    getSettings(category = '', name = '') {
        if (category && name) {
            return this.findOne({category: category, name: name});
        } else if (category) {
            return this.find({category: category}).fetch();
        }

        return this.find({}).fetch();
    }

    /**
     * check data before insert
     * @param doc
     * @returns {boolean}
     */
    beforeInsert(doc) {
        if (doc && doc.category && doc.name) {
            const findUnique = this.find({category: doc.category, name: doc.name}).fetch();
            if (findUnique && findUnique.length > 0) {
                return false;
            }
        }

        return true;
    }

    /**
     * insert data
     * @param doc
     * @param callback
     * @returns {*|boolean}
     */
    insert(doc, callback) {
        if (doc) {
            if (!doc.category) {
                doc.category = 'System';
            }
        }
        return super.insert(doc, callback);
    }
}

const Settings = new SettingsCollection('settings');

Settings.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Settings.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const SettingsSchema = new SimpleSchema({
    createdAt: {
        type: String,
        label: 'The date setting was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    category: {
        type: String,
        label: 'Settings category'
    },
    name: {
        type: String,
        label: 'Name of setting'
    },
    value: {
        type: String,
        label: 'Value of setting'
    }
});

Settings.attachSchema(SettingsSchema);

export default Settings;
