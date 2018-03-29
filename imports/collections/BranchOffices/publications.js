import {Meteor} from 'meteor/meteor';
import BranchOffices from './BranchOffices';

// init pagination
BranchOffices.publishPagination();

Meteor.publish('branchOffices.list', function () {
    return BranchOffices.publish(Meteor.user(), {});
});

Meteor.publish('branchOffices.detail', function (branchId) {
    return BranchOffices.publish(Meteor.user(), {_id: branchId});
});
