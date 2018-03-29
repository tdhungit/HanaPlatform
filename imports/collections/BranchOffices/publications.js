import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import BranchOffices from './BranchOffices';

// init pagination
publishPagination(BranchOffices, {
    filters: {},
    dynamic_filters: function () {
        return {
            companyId: Meteor.user().companyId
        }
    }
});

Meteor.publish('branchOffices.list', function () {
    return BranchOffices.publish(Meteor.user(), {});
});

Meteor.publish('branchOffices.detail', function (branchId) {
    return BranchOffices.publish(Meteor.user(), {_id: branchId});
});
