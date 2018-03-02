import {Meteor} from 'meteor/meteor';
import Models from './Models';

Meteor.methods({
    'models.insert': function (model) {
        return Models.insert(model);
    }
});
