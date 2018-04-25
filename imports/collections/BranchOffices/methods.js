import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import BranchOffices from './BranchOffices';
import {aclAccess} from '../Users/aclUtils';

Meteor.methods({
    'branchOffices.insert': function (branch) {
        // check permission
        aclAccess('BranchOffices', 'Create');

        check(branch, Object);
        return BranchOffices.insert(branch);
    },
    'branchOffices.update': function (branch) {
        // check permission
        aclAccess('BranchOffices', 'Edit');

        check(branch, Object);
        try {
            const branchId = branch._id;
            BranchOffices.update(branchId, {$set: branch});
            return branchId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    },
    'branchOffices.import': function (data) {
        // check permission
        aclAccess('BranchOffices', 'Create');

        return BranchOffices.importData(data);
    },
    'branchOffices.export': function () {
        // check permission
        aclAccess('BranchOffices', 'List');

        return BranchOffices.find().fetch();
    }
});
