import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import CollectionCore from './CollectionCore';

/**
 * Db collection for Hana Platform
 */
class CollectionBase extends CollectionCore {
    /**
     * default add company field to schema
     * @param schema
     */
    static schema(schema) {
        let appSchema = schema;
        appSchema.companyId = {
            type: String,
            required: true
        };

        return new SimpleSchema(appSchema);
    }

    /**
     * init
     * @param collection
     * @param options
     */
    constructor(collection, options) {
        super(collection, options);
    }

    /**
     * insert data
     * @param doc
     * @param callback
     * @returns {*}
     */
    insert(doc, callback) {
        if (!doc.companyId) {
            doc.companyId = Meteor.user().companyId;
        }

        return super.insert(doc, callback);
    }

    /**
     * update data
     * @param selector
     * @param modifiers
     * @param options
     * @param callback
     * @returns {*}
     */
    update(selector, modifiers, options, callback) {
        return super.update(selector, modifiers, options, callback);
    }

    /**
     * find a record in a company
     * @param query
     * @param options {{}}
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
            selector.companyId = '';
            if (Meteor.user() && Meteor.user().companyId) {
                selector.companyId = Meteor.user().companyId;
            }
        }

        return super.findOne(selector, options);
    }

    /**
     * find all record in a company
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
            selector.companyId = '';
            if (Meteor.user() && Meteor.user().companyId) {
                selector.companyId = Meteor.user().companyId;
            }
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

        selector.companyId = '';
        if (user && user.companyId) {
            selector.companyId = user.companyId;
        }

        return super.publish(user, selector, options);
    }

    /**
     * get client pagination
     * @param options
     * @returns {PaginationFactory|*}
     */
    pagination(options = {}) {
        if (!options) {
            options = {filters: {}};
        }

        if (!options.filters) {
            options.filters = {};
        }

        if (!options.filters.companyId) {
            options.filters.companyId = Meteor.user().companyId;
        }

        return super.pagination(options);
    }
}

export default CollectionBase;
