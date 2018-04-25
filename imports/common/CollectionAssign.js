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
        // company data
        appSchema.companyId = {
            type: String,
            required: true
        };

        // assigned to user
        appSchema.assignedId = {
            type: String,
            required: true
        };

        // assigned to branch offices
        if (!appSchema.branchOffices) {
            appSchema.branchOffices = {
                type: Array,
                required: true
            };
            appSchema["branchOffices.$"] = {
                type: String
            };
        } else {
            appSchema.branchOffices.required = true;
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
        if (!doc.assignedId) {
            doc.assignedId = Meteor.userId();
        }

        if (!doc.branchOffices) {
            const branchOfficeId = Meteor.user().settings && Meteor.user().settings.branchOfficeId;
            doc.branchOffices = [branchOfficeId];
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
            if (!user.isAdmin) {
                selector.branchOffices = user.settings && user.settings.branchOfficeId || ''
            }
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
