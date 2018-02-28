import CollectionBase from '/imports/common/CollectionBase';
import SimpleSchema from 'simpl-schema';

class SettingsCollection extends CollectionBase {
    getSystemSettings() {
        const settings = this.find({category: 'Systems'}).fetch();
        let systemSettings = {};
        for (let idx in settings) {
            let setting = settings[idx];
            systemSettings[setting.name] = setting;
        }
        return systemSettings;
    }

    getSettings(category = '', name = '') {
        let params = {};
        if (category) {
            params.category = category;
        }

        if (name) {
            params.name = name;
        }

        return this.find(params).fetch();
    }

    beforeInsert(doc) {
        if (doc && doc.category && doc.name) {
            const findUnique = this.find({category: doc.category, name: doc.name}).fetch();
            if (findUnique && findUnique.length > 0) {
                return false;
            }
        }

        return true;
    }

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
