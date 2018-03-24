import {Meteor} from 'meteor/meteor';
import CollectionAssign from '/imports/common/CollectionAssign';
import Models from './Models';
import {publishPagination} from 'meteor/kurounin:pagination';

Meteor.publish('models.list', () => {
    return Models.publish(Meteor.user());
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
            const collectionSchema = CollectionAssign.schema(schemaObject);
            collection.attachSchema(collectionSchema);
        }
        // add collections
        collections[model.model] = collection;
        // pagination
        publishPagination(collection, {
            filters: {},
            dynamic_filters: function () {
                return {
                    sysCompanyId: Meteor.user().sysCompanyId,
                    assignedId: Meteor.userId()
                }
            }
        });
    }
}

// we need set publish in here because we have all collections here. If we set other place, we will be duplicate collection init
Meteor.publish('models.detailRecord', (modelName, recordId) => {
    if (collections[modelName]) {
        return collections[modelName].publish(Meteor.user(), {_id: recordId});
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
