import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import CollectionBase from './CollectionBase';

/**
 * Db Collection auto assigned when record was created
 */
class CollectionAssign extends CollectionBase {
    /**
     * default add company and assigned field to schema
     * @param schema
     */
    static schema(schema) {
        let appSchema = schema;
        appSchema.sysCompanyId = {
            type: String,
            required: true
        };

        appSchema.assignedId = {
            type: String,
            required: true
        };

        return new SimpleSchema(appSchema);
    }

    /**
     * insert data
     * @param doc
     * @param callback
     * @returns {*|boolean}
     */
    insert(doc, callback) {
        doc.assignedId = Meteor.user()._id;
        return super.insert(doc, callback);
    }
}

export default CollectionAssign;
