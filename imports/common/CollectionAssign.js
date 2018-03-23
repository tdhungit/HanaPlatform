import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import CollectionBase from './CollectionBase';

/**
 * Db Collection auto assigned when record was created
 */
class CollectionAssign extends CollectionBase {
    static schema(schema) {
        let appSchema = schema;
        if (!appSchema.sysCompanyId) {
            appSchema.sysCompanyId = {
                type: String,
                required: true
            };
        }

        if (!appSchema.assignedId) {
            appSchema.assignedId = {
                type: String,
                required: true
            };
        }

        return new SimpleSchema(appSchema);
    }

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
