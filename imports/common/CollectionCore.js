import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import _ from 'underscore';
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
     * get current Model Name
     * @returns {string}
     */
    getModelName() {
        const className = this.constructor.name;
        return className.replace('Collection', '');
    }

    /**
     * get default layouts
     * @returns {{}}
     */
    getLayouts() {
        return {};
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
     * fixed filter for collection
     * @param user
     * @param selector
     * @param actionName
     * @returns {*}
     */
    fixedFilters(user, selector, actionName = 'View') {
        return selector;
    }

    /**
     * get filters for owner data
     * @param user if user === -1 => only get raw filter
     * @param filters
     * @param actionName
     * @returns {{}}
     */
    filterOwnerData(user, filters = {}, actionName = 'View') {
        if (user === -1) {
            return filters;
        }

        let selector = {};
        if (typeof filters === 'string') {
            selector._id = filters;
        } else {
            selector = {...filters};
        }

        return this.fixedFilters(user, selector, actionName);
    }

    /**
     * get a record data
     * @param query
     * @param options
     * @returns {any}
     */
    findOne(query = {}, options = {}) {
        let selector = this.filterOwnerData(-1, query, 'View');

        if (Meteor.isClient) {
            selector = this.filterOwnerData(Meteor.user(), selector, 'View');
        }

        return super.findOne(selector, options);
    }

    /**
     * get all records data
     * @param query
     * @param options
     * @returns {Mongo.Cursor}
     */
    find(query = {}, options = {}) {
        const actionName = options && options.actionName || 'View';
        let selector = this.filterOwnerData(-1, query, actionName);

        if (Meteor.isClient) {
            selector = this.filterOwnerData(Meteor.user(), selector, actionName);
        }

        return super.find(selector, options);
    }

    /**
     * get one record in collection
     * @param user
     * @param query
     * @param options
     * @returns {any}
     */
    queryOne(user, query = {}, options = {}) {
        const selector = this.filterOwnerData(user, query, 'View');
        return super.findOne(selector, options);
    }

    /**
     * query data from collection
     * @param user
     * @param query
     * @param options
     * @returns {Mongo.Cursor}
     */
    query(user, query = {}, options = {}) {
        const actionName = options && options.actionName || 'View';
        const selector = this.filterOwnerData(user, query, actionName);
        return super.find(selector, options);
    }

    /**
     * publish data to client
     * @param user
     * @param query
     * @param options
     * @returns {Mongo.Cursor}
     */
    publish(user, query = {}, options = {}) {
        return this.query(user, query, options);
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
                return self.filterOwnerData(Meteor.user(), filters, 'View');
            }
        });
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
        if(!options) {
            options = {};
        }

        if (!options.filters) {
            options.filters = {};
        }

        const limit = this.getLimit();
        const filters = this.filterOwnerData(Meteor.user(), options.filters, 'View');
        return new Meteor.Pagination(this, {
            filters: filters,
            sort: options && options.sort || {},
            perPage: limit,
            reactive: true,
            debug: false
        });
    }

    /**
     * import data to collection
     * @param data
     * @returns {{successes: Array, errors: Array}}
     */
    importData(data) {
        let result = {
            successes: [],
            errors: []
        };

        _.each(data, (record) => {
            try {
                let recordId = record._id || '';
                if (recordId) {
                    this.update(recordId, {$set: record});
                } else {
                    recordId = this.insert(record);
                }

                result.successes.push({
                    _id: recordId,
                    record: record
                });
            } catch (exception) {
                result.errors.push({
                    record: record,
                    error: exception
                });
            }
        });

        return result;
    }
}

export default CollectionCore;