import CollectionCore from '/imports/common/CollectionCore';

class CompaniesCollection extends CollectionCore {

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
