import CollectionCore from '/imports/common/CollectionCore';
import {companyLayouts} from './layouts';

class CompaniesCollection extends CollectionCore {
    /**
     * get default layouts
     */
    getLayouts() {
        return companyLayouts;
    }

    /**
     * filterOwnerData
     * @param user
     * @param filters
     */
    filterOwnerData(user, filters = {}) {
        let selector = {};
        if (filters) {
            if (typeof filters === 'string') {
                selector._id = filters;
            } else {
                selector = filters;
            }
        }

        if (user && user._id) {
            if (!user.isDeveloper) {
                selector._id = user.companyId;
            }
        }

        return selector;
    }
}

const Companies = new CompaniesCollection('system_companies');

Companies.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Companies.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const CompaniesSchema = CollectionCore.schema({
    createdAt: {
        type: String,
        label: 'The date this record was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        },
    },
    name: {
        type: String,
        label: 'System Company Name',
        required: true
    },
    domain: {
        type: String,
        label: 'Company Domain',
        required: true
    }
});

Companies.attachSchema(CompaniesSchema);

export default Companies;
