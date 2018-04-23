import {Meteor} from 'meteor/meteor';
import Companies from './Companies';

// init pagination
Companies.publishPagination();

Meteor.publish('companies.list', function () {
    return Companies.publish(Meteor.user(), {});
});

Meteor.publish('companies.detail', function (companyId) {
    return Companies.publish(Meteor.user(), {_id: companyId});
});
