import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import SysCompanies from './SysCompanies';

Meteor.methods({
    'syscompanies.insert': (company) => {
        check(company, Object);
        return SysCompanies.insert(company);
    },
    'syscompanies.update': (company) => {
        check(company, Object);
        try {
            const companyId = company._id;
            SysCompanies.update(companyId, {$set: company});
            return companyId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    }
});