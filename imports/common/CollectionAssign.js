import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import CollectionBase from './CollectionBase';
import Users from '../collections/Users/Users';

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
        if (!doc.assignedId) {
            doc.assignedId = Meteor.user()._id;
        }

        return super.insert(doc, callback);
    }

    /**
     * get a record have assigned to current user
     * @param query
     * @param options
     * @returns {any}
     */
    findOne(query = '', options = {}) {
        let selector = {};

        if (query) {
            if (typeof query === "string") {
                selector = {_id: query};
            } else {
                selector = query;
            }
        }

        if (Meteor.isClient) {
            selector.assignedId = Meteor.userId();
        }

        return super.findOne(selector, options);
    }

    /**
     * get all records assigned to current user
     * @param query
     * @param options
     * @returns {Mongo.Cursor}
     */
    find(query = '', options = {}) {
        let selector = {};

        if (query) {
            if (typeof query === "string") {
                selector = {_id: query};
            } else {
                selector = query;
            }
        }

        if (Meteor.isClient) {
            selector.assignedId = Meteor.userId();
        }

        return super.find(selector, options);
    }

    /**
     * publish data to client
     * @param user
     * @param query
     * @param options
     * @returns {Mongo.Cursor}
     */
    publish(user, query = '', options = {}) {
        let selector = {};

        if (query) {
            if (typeof query === "string") {
                selector = {_id: query};
            } else {
                selector = query;
            }
        }

        selector.assignedId = user._id;
        return super.publish(user, selector, options);
    }
}

export default CollectionAssign;
