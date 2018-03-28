import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';
import SysCompanies from './SysCompanies';
import UserGroups from '../UserGroups/UserGroups';

Meteor.methods({
    'sysCompanies.insert': function (company) {
        check(company, Object);
        return SysCompanies.insert(company);
    },
    'sysCompanies.update': function (company) {
        check(company, Object);
        try {
            const companyId = company._id;
            SysCompanies.update(companyId, {$set: company});
            return companyId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    },
    // register a new sys company
    // company: company info for register
    // user: user admin info for register
    'sysCompanies.register': function (company, user) {
        check(company, Object);
        check(user, Object);

        let installation = false;
        const sysCompany = SysCompanies.findOne();
        if (!sysCompany || !sysCompany._id) {
            installation = true;
        }

        // insert company
        const companyId = SysCompanies.insert(company);
        if (companyId) {
            // insert a default group
            const defaultGroup = {
                name: 'Default',
                description: 'Default Group',
                sysCompanyId: companyId
            };

            const groupId = UserGroups.insert(defaultGroup);
            // insert admin user
            if (groupId) {
                let userAdmin = user;
                userAdmin.sysCompanyId = companyId;
                userAdmin.groupId = groupId;
                userAdmin.isAdmin = true;
                if (installation) {
                    userAdmin.isDeveloper = true;
                }

                Accounts.onCreateUser(function (options, user) {
                    user.sysCompanyId = options.sysCompanyId;
                    user.groupId = options.groupId;
                    user.isAdmin = options.isAdmin;
                    user.isDeveloper = options.isDeveloper;
                    return user;
                });
                Accounts.createUser(userAdmin);
            }

            return companyId;
        } else {
            throw new Meteor.Error('500', 'Error register, please try again');
        }
    }
});