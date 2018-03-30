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
        appSchema.companyId = {
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

        if (user !== -1 && !selector.assignedId) {
            selector.assignedId = user && user._id || '';
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

        if (!options.filters || !options.filters.assignedId) {
            options.filters.assignedId = Meteor.userId();
        }

        return super.pagination(options);
    }
}

export default CollectionAssign;
