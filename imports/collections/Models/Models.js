import CollectionBase from '/imports/common/CollectionBase';

class ModelsCollection extends CollectionBase {
    getModel(modelName) {
        return this.findOne({model: modelName});
    }
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

const ModelsSchema = CollectionBase.schema({
    createdAt: {
        type: String,
        label: 'The date that record was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    type: {
        type: String,
        label: 'Type of model',
        allowedValues: ['custom', 'system'],
        defaultValue: 'custom'
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
