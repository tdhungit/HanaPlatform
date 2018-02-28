import {Meteor} from 'meteor/meteor';
import CollectionBase from './CollectionBase';

class CollectionAssign extends CollectionBase {
    insert(doc, callback) {
        doc.assigned_to_id = Meteor.user()._id;
        return super.insert(doc, callback);
    }
}

export default CollectionAssign;
