import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Models from './Models';

Meteor.methods({
    'models.insert': function (model) {
        check(model, {
            module: String,
            collection: String,
            status: Boolean,
            schema: String
        });
        return Models.insert(model);
    }
});
