import {Meteor} from 'meteor/meteor';
import {publishPagination} from 'meteor/kurounin:pagination';
import SysCompanies from './SysCompanies';

// init pagination
publishPagination(SysCompanies, {});

Meteor.publish('sysCompanies.list', () => {
    return SysCompanies.find({});
});

Meteor.publish('sysCompanies.detail', (companyId) => {
    return SysCompanies.find({_id: companyId});
});
