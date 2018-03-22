import {Meteor} from 'meteor/meteor';
import CollectionBase from './CollectionBase';

/**
 * Db Collection auto assigned when record was created
 */
class CollectionAssign extends CollectionBase {
    /**
     * insert data
     * @param doc
     * @param callback
     * @returns {*|boolean}
     */
    insert(doc, callback) {
        doc.assigned_to_id = Meteor.user()._id;
        return super.insert(doc, callback);
    }
}

export default CollectionAssign;
