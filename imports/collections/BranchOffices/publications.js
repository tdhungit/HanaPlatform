import {Meteor} from 'meteor/meteor';
import BranchOffices from './BranchOffices';

// init pagination
BranchOffices.publishPagination();

Meteor.publish('branchOffices.forCurrentUser', function () {
    if (this.userId) {
        return BranchOffices.publish(Meteor.user(), {_id: {$in: Meteor.user().branchOffices}});
    }

    return this.ready();
});

Meteor.publish('branchOffices.list', function () {
    return BranchOffices.publish(Meteor.user(), {});
});

Meteor.publish('branchOffices.detail', function (branchId) {
    return BranchOffices.publish(Meteor.user(), {_id: branchId});
});
