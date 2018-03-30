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
     * get filters for owner data
     * @param user if user === -1 => only get raw filter
     * @param filters
     * @returns {{}}
     */
    filterOwnerData(user, filters = {}) {
        let selector = {};
        if (typeof filters === 'string') {
            selector._id = filters;
        } else {
            selector = filters;
        }

        if (user !== -1 && !selector.companyId) {
            selector.companyId = user && user.companyId || '';
        }

        return super.filterOwnerData(user, selector);
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
