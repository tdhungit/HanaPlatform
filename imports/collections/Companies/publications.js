import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import Companies from './Companies';

// init pagination
publishPagination(Companies, {});

Meteor.publish('companies.list', function () {
    return Companies.find({});
});

Meteor.publish('companies.detail', function (companyId) {
    return Companies.find({_id: companyId});
});
