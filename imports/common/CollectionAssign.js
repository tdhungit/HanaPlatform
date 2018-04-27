import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import CollectionBase from './CollectionBase';
import {filtersAssigned, filtersBranch} from '../collections/Users/aclUtils';

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
     * fixed filters for owner data
     * @param user if user === -1 => only get raw filter
     * @param selector
     * @param actionName
     * @returns {{}}
     */
    fixedFilters(user, selector = {}, actionName = 'View') {
        selector = super.fixedFilters(user, selector, actionName);
        if (user) {
            if (user.isAdmin || user.isDeveloper) {
                if (!selector.branchOffices && user.settings && user.settings.branchOfficeId) {
                    selector.branchOffices = user.settings.branchOfficeId;
                }
            } else {
                selector = filtersBranch(user, selector, 'branchOffices');
                // check data assigned
                const modelName = this.getModelName();
                selector = filtersAssigned(user, modelName, actionName, selector, 'assignedId');
            }
        } else {
            selector.branchOffices = '';
            selector.assignedId = '';
        }

        return selector;
    }
}

export default CollectionAssign;
