import {Meteor} from 'meteor/meteor';
import CollectionAssign from '/imports/common/CollectionAssign';
import Models from '/imports/collections/Models/Models';

/**
 * Class core for models were created
 */
class MyModel {
    /**
     * get client collection from model name
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

            const collectionName = 'custom_' + model.companyId + '_' + model.collection;
            const collection = new CollectionAssign(collectionName);
            if (model.schema) {
                const schemaObject = eval('(' + model.schema + ')');
                const collectionSchema = CollectionAssign.schema(schemaObject);
                collection.attachSchema(collectionSchema);
            }
            return collection;
        }

        return false;
    }
}

export const myModel = new MyModel();
