import {Meteor} from 'meteor/meteor';
import Companies from './Companies';

// init pagination
Companies.publishPagination();

Meteor.publish('companies.list', function () {
    return Companies.find({});
});

Meteor.publish('companies.detail', function (companyId) {
    return Companies.find({_id: companyId});
});
