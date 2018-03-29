import {Meteor} from 'meteor/meteor';
import BranchOffices from './BranchOffices';

Meteor.publish('branchOffices.list', function () {
    return BranchOffices.publish(Meteor.user(), {});
});

Meteor.publish('branchOffices.detail', function (branchId) {
    return BranchOffices.publish(Meteor.user(), {_id: branchId});
});
