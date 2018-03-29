import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import BranchOffices from './BranchOffices';

Meteor.methods({
    'branchOffices.insert': function (branch) {
        check(branch, Object);
        return BranchOffices.insert(branch);
    },
    'branchOffices.update': function (branch) {
        check(branch, Object);
        try {
            const branchId = branch._id;
            BranchOffices.update(branchId, {$set: branch});
            return branchId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    }
});
