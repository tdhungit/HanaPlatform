import CollectionBase from '/imports/common/CollectionBase';

class BranchOfficesCollection extends CollectionBase {

}

const BranchOffices = new BranchOfficesCollection('branch_offices');

BranchOffices.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

BranchOffices.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

const BranchOfficesSchema = CollectionBase.schema({
    createdAt: {
        type: String,
        label: 'The date this record was created.',
        autoValue() {
            if (this.isInsert) return (new Date()).toISOString();
            return this.value;
        }
    },
    name: {
        type: String,
        label: 'Branch Name',
    },
    phone: {
        type: String,
        label: 'Phone',
        optional: true
    },
    address: {
        type: String,
        label: 'Address',
        optional: true
    },
    description: {
        type: String,
        label: 'Branch Description',
        optional: true
    }
});

BranchOffices.attachSchema(BranchOfficesSchema);

export default BranchOffices;