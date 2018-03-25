import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * Db collection for Hana Platform
 */
class CollectionBase extends Mongo.Collection {
    /**
     * default add company field to schema
     * @param schema
     */
    static schema(schema) {
        let appSchema = schema;
        appSchema.sysCompanyId = {
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
        if (!doc.sysCompanyId) {
            doc.sysCompanyId = Meteor.user().sysCompanyId;
        }

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
     * find a record in a company
     * @param query
     * @param options {{}}
     * @returns {any}
     */
    findOne(query = '', options = {}) {
        let selector = {};

        if (typeof query === "string") {
            selector = {_id: query};
        }

        if (Meteor.isClient) {
            selector.sysCompanyId = '';
            if (Meteor.user() && Meteor.user().sysCompanyId) {
                selector.sysCompanyId = Meteor.user().sysCompanyId;
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
    find(query = {}, options = {}) {
        let selector = query;

        if (Meteor.isClient) {
            selector.sysCompanyId = '';
            if (Meteor.user() && Meteor.user().sysCompanyId) {
                selector.sysCompanyId = Meteor.user().sysCompanyId;
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
    publish(user, query = {}, options = {}) {
        let selector = query;

        selector.sysCompanyId = '';
        if (user && user.sysCompanyId) {
            selector.sysCompanyId = user.sysCompanyId;
        }

        return this.find(selector, options);
    }
}

export default CollectionBase;
