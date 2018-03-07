import {Meteor} from 'meteor/meteor';
import CollectionAssign from '/imports/common/CollectionAssign';
import Models from './Models';
import {publishPagination} from 'meteor/kurounin:pagination';
import SimpleSchema from "simpl-schema";

Meteor.publish('models.list', () => {
    return Models.find({});
});

// get custom model and add pagination
const models = Models.find({type: 'custom'}).fetch();
let collections = {};
for (let idx in models) {
    let model = models[idx];
    if (model.collection) {
        let collection = new CollectionAssign(model.collection);
        // add schema
        if (model.schema) {
            const schemaObject = eval('(' + model.schema + ')');
            const collectionSchema = new SimpleSchema(schemaObject);
            collection.attachSchema(collectionSchema);
        }
        // add collections
        collections[model.model] = collection;
        // list
        publishPagination(collection);
    }
}

Meteor.publish('models.detailRecord', (modelName, recordId) => {
    if (collections[modelName]) {
        return collections[modelName].find({_id: recordId});
    }
});

// method models
Meteor.methods({
    'models.insertRecord': function (modelName, record) {
        const collection = collections[modelName];
        if (collection) {
            return collection.insert(record);
        } else {
            throw new Meteor.Error('500', 'Can not found Model: ' + modelName);
        }
    },
    'models.updateRecord': function (modelName, record) {
        const collection = collections[modelName];
        if (collection) {
            try {
                const recordId = record._id;
                collection.update(recordId, {$set: record});
                return recordId;
            } catch (exception) {
                throw new Meteor.Error('500', exception);
            }
        } else {
            throw new Meteor.Error('500', 'Can not found Model: ' + modelName);
        }
    }
});
