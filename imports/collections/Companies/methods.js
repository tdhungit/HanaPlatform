import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';
import Companies from './Companies';
import BranchOffices from '../BranchOffices/BranchOffices';
import UserGroups from '../UserGroups/UserGroups';
import {aclAccess} from '../Users/aclUtils';

Meteor.methods({
    'companies.insert': function (company) {
        // check permission
        aclAccess('Companies', 'Create');

        check(company, Object);
        const companyId = Companies.insert(company);
        // auto create new branch office
        const branchOffice = {
            companyId: companyId,
            name: 'Head Office'
        };

        const branchOfficeId = BranchOffices.insert(branchOffice);

        // auto create group user
        const userGroup = {
            companyId: companyId,
            name: 'Default'
        };

        const groupId = UserGroups.insert(userGroup);

        return {
            companyId: companyId,
            branchOfficeId: branchOfficeId,
            groupId: groupId
        };
    },
    'companies.update': function (company) {
        // check permission
        aclAccess('Companies', 'Edit');

        check(company, Object);
        try {
            const companyId = company._id;
            Companies.update(companyId, {$set: company});
            return companyId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    },
    // register a new sys company
    // company: company info for register
    // user: user admin info for register
    'companies.register': function (company, user) {
        check(company, Object);
        check(user, Object);

        let installation = false;
        const existCompany = Companies.findOne();
        if (!existCompany || !existCompany._id) {
            installation = true;
        }

        // insert company
        const companyId = Companies.insert(company);
        if (companyId) {
            // insert a default branch office
            const defaultBranchOffice = {
                name: 'Head Office',
                companyId: companyId
            };
            const branchOfficeId = BranchOffices.insert(defaultBranchOffice);

            // insert a default group
            const defaultGroup = {
                name: 'Default',
                description: 'Default Group',
                companyId: companyId
            };
            const groupId = UserGroups.insert(defaultGroup);

            // insert admin user
            let userAdmin = user;
            userAdmin.companyId = companyId;
            userAdmin.branchOffices = [branchOfficeId];
            userAdmin.groupId = groupId;
            userAdmin.isAdmin = true;
            if (installation) {
                userAdmin.isDeveloper = true;
            }

            Accounts.onCreateUser(function (options, user) {
                user.companyId = options.companyId;
                user.branchOffices = options.branchOffices;
                user.groupId = options.groupId;
                user.isAdmin = options.isAdmin;
                user.isDeveloper = options.isDeveloper;
                return user;
            });
            Accounts.createUser(userAdmin);

            return companyId;
        } else {
            throw new Meteor.Error('500', 'Error register, please try again');
        }
    }
});