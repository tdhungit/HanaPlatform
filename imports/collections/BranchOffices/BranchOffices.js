import CollectionBase from '/imports/common/CollectionBase';
import Users from '../Users/Users';
import {branchOfficeLayouts} from './layouts';
import {BranchOfficeTypes} from './config';

class BranchOfficesCollection extends CollectionBase {
    /**
     * get all branch offices of user
     * @param userParam
     * @returns {Array}
     */
    ofUser(userParam) {
        let user = {};
        if (typeof userParam === 'string') {
            user = Users.getOne(userParam);
        } else {
            user = userParam;
        }

        const branchOffices = this.find({
            _id: {$in: user.branchOffices},
            type: {$not: 'Warehouse'}
        }).fetch();
        return branchOffices ? branchOffices : [];
    }

    /**
     * get default layouts
     */
    getLayouts() {
        return branchOfficeLayouts;
    }
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
    type: {
        type: String,
        defaultValue: BranchOfficeTypes.Office
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