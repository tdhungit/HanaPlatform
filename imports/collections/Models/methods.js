import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Models from './Models';
import {myModel} from '/imports/common/Model';

Meteor.methods({
    'models.insert': function (model) {
        check(model, {
            module: String,
            collection: String,
            status: Boolean,
            schema: String
        });
        return Models.insert(model);
    },
    'models.update': function (model) {
        check(model, Object);
        try {
            const modelId = model._id;
            Models.update(modelId, {$set: model});
            return modelId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    },
    'models.insertRecord': function (modelName, record) {
        const model = myModel.getCollection(modelName);
        if (model) {
            return model.insert(record);
        } else {
            throw new Meteor.Error('500', 'Can not found Model: ' + modelName);
        }
    }
});
