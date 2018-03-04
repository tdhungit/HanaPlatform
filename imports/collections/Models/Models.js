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
    model: {
        type: String,
        label: 'Model name'
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
    },
    icon: {
        type: String,
        label: 'Module icon',
        defaultValue: 'fa fa-cogs'
    },
    list: {
        type: Object,
        label: 'List View fields',
        blackbox: true
    },
    view: {
        type: Object,
        label: 'Detail/Edit/View fields',
        blackbox: true
    }
});

Models.attachSchema(ModelsSchema);

export default Models;
