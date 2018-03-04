import {
    coreCollections,
    customCollections
} from '/imports/collections/collections';
import CollectionAssign from '/imports/common/CollectionAssign';
import Models from '/imports/collections/Models/Models';
import SimpleSchema from 'simpl-schema';

class MyModel {
    getCollection(modelName) {
        if (customCollections.includes(modelName)) {
            return require('/imports/collections/' + modelName + '/' + modelName).default;
        }

        if (coreCollections.includes(modelName)) {
            return require('/imports/collections/' + modelName + '/' + modelName).default;
        }

        const model = Models.findOne({model: modelName});
        if (model && model.collection) {
            const collection = new CollectionAssign(model.collection);
            const schemaObject = eval('(' + model.schema + ')');
            const collectionSchema = new SimpleSchema(schemaObject);
            collection.attachSchema(collectionSchema);
            return collection;
        }

        return false;
    }
}

const myModel = new MyModel();
export {
    myModel
}