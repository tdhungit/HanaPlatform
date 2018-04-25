import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Models from './Models';
import {aclAccess} from '../Users/aclUtils';

Meteor.methods({
    'models.insert': function (model) {
        // check permission
        aclAccess('Models', 'Create');

        check(model, {
            module: String,
            collection: String,
            status: Boolean,
            schema: String
        });
        return Models.insert(model);
    },
    'models.update': function (model) {
        // check permission
        aclAccess('Models', 'Edit');

        check(model, Object);
        try {
            const modelId = model._id;
            Models.update(modelId, {$set: model});
            return modelId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    }
});
