import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import SysCompanies from './SysCompanies';

// init pagination
publishPagination(SysCompanies, {});

Meteor.publish('syscompanies.list', () => {
    return SysCompanies.find({});
});

Meteor.publish('syscompanies.detail', (companyId) => {
    return SysCompanies.find({_id: companyId});
});
