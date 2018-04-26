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
        // company data
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
     * fixed filters for owner data
     * @param user
     * @param selector
     * @param actionName
     * @returns {{}}
     */
    fixedFilters(user, selector = {}, actionName = 'View') {
        selector = super.fixedFilters(user, selector, actionName);
        selector.companyId = user && user.companyId || '';
        return selector;
    }
}

export default CollectionBase;
