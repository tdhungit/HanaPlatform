import CollectionBase from '/imports/common/CollectionBase';
import SimpleSchema from 'simpl-schema';

class ModelsCollection extends CollectionBase {

}

const Models = new ModelsCollection('models');

Models.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Models.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const ModelsSchema = new SimpleSchema({
    createdAt: {
        type: String,
        label: 'The date that record was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    module: {
        type: String,
        label: 'Module name',
        defaultValue: 'Core'
    },
    collection: {
        type: String,
        label: 'Collection name'
    },
    status: {
        type: Boolean,
        label: 'Collection status',
        defaultValue: true
    },
    schema: {
        type: String,
        label: 'Collection schema'
    }
});

Models.attachSchema(ModelsSchema);

export default Models;
