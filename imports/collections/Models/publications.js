import {Meteor} from 'meteor/meteor';
import Models from './Models';

Meteor.publish('models.list', () => {
    return Models.find({});
});

Meteor.publish('models.detail', (modelId) => {
    return Models.find({_id: modelId});
});