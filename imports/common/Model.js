import CollectionAssign from '/imports/common/CollectionAssign';
import Models from '/imports/collections/Models/Models';
import SimpleSchema from 'simpl-schema';

class MyModel {
    getCollection(modelName) {
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