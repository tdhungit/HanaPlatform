import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {publishPagination} from 'meteor/kurounin:pagination';
import SimpleSchema from 'simpl-schema';

class CollectionCore extends Mongo.Collection {
    /**
     * default add company field to schema
     * @param schema
     */
    static schema(schema) {
        let appSchema = schema;

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
     * check data before insert
     * @param doc
     * @returns {boolean}
     */
    beforeInsert(doc) {
        return true;
    }

    /**
     * process after insert data
     * @param doc
     * @param resultInsert
     */
    afterInsert(doc, resultInsert) {

    }

    /**
     * check data before update data
     * @param selector
     * @param modifiers
     * @param options
     * @returns {boolean}
     */
    beforeUpdate(selector, modifiers, options) {
        return true;
    }

    /**
     * process data after update data
     * @param selector
     * @param modifiers
     * @param options
     * @param resultUpdate
     */
    afterUpdate(selector, modifiers, options, resultUpdate) {

    }

    /**
     * insert data
     * @param doc
     * @param callback
     * @returns {*}
     */
    insert(doc, callback) {
        if (this.beforeInsert(doc)) {
            const result = super.insert(doc, callback);
            this.afterInsert(doc, result);
            return result;
        }

        return false;
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
        if (this.beforeUpdate(selector, modifiers, options)) {
            const result = super.update(selector, modifiers, options, callback);
            this.afterUpdate(selector, modifiers, options, result);
            return result;
        }

        return false;
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

        if (!user || user._id) {
            selector._id = '';
        }

        return this.find(selector, options);
    }

    /**
     * publish pagination server side
     * @param filters
     */
    publishPagination(filters = {}) {
        const self = this;
        publishPagination(this, {
            filters: {},
            dynamic_filters: function () {
                return self.filterOwnerData(Meteor.user(), filters);
            }
        });
    }

    /**
     * get filters for owner data
     * @param user
     * @param filter
     * @returns {{}}
     */
    filterOwnerData(user, filter = {}) {
        if (!user || !user.companyId) {
            filter._id = '';
        }

        return filter;
    }

    /**
     * get pagination limit
     * @returns {number}
     */
    getLimit() {
        return 20;
    }

    /**
     * get client pagination
     * @param options
     * @returns {PaginationFactory|*}
     */
    pagination(options = {}) {
        const limit = this.getLimit();

        return new Meteor.Pagination(this, {
            filters: options && options.filters || {},
            sort: options && options.sort || {},
            perPage: limit,
            reactive: true,
            debug: false
        });
    }
}

export default CollectionCore;