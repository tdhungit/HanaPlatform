import CollectionAssign from '/imports/common/CollectionAssign';
import Models from '/imports/collections/Models/Models';
import SimpleSchema from 'simpl-schema';
import {Meteor} from 'meteor/meteor';

/**
 * Class core for models were created
 */
class MyModel {
    /**
     * get collection from model name
     * @param modelName
     * @returns {*}
     */
    getCollection(modelName) {
        const model = Models.findOne({model: modelName});
        if (model && model.collection) {
            if (Meteor.connection && Meteor.connection._stores) {
                const store = Meteor.connection._stores[model.collection];
                if (store) {
                    return store._getCollection();
                }
            }

            const collection = new CollectionAssign(model.collection);
            if (model.schema) {
                const schemaObject = eval('(' + model.schema + ')');
                const collectionSchema = new SimpleSchema(schemaObject);
                collection.attachSchema(collectionSchema);
            }
            return collection;
        }

        return false;
    }
}

export const myModel = new MyModel();
