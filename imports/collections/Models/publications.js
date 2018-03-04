import {Meteor} from 'meteor/meteor';
import CollectionAssign from '/imports/common/CollectionAssign';
import Models from './Models';
import {publishPagination} from 'meteor/kurounin:pagination';

Meteor.publish('models.list', () => {
    return Models.find({});
});

const models = Models.find({}).fetch();
for (let idx in models) {
    let model = models[idx];
    if (model.collection) {
        let collection = new CollectionAssign(model.collection);
        publishPagination(collection);
    }
}
