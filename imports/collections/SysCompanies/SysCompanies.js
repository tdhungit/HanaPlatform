import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class SysCompaniesCollection extends Mongo.Collection {

}

const SysCompanies = new SysCompaniesCollection('syscompanies');

SysCompanies.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

SysCompanies.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

SysCompaniesSchema = new SimpleSchema({
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

SysCompanies.attachSchema(SysCompaniesSchema);

export default SysCompanies;
