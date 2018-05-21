import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import MainMenus from './MainMenus';
import {aclAccess} from '../Users/aclUtils';

Meteor.methods({
    // only get root menu
    'mainMenus.ROOT': function () {
        const user = Meteor.user();
        return MainMenus.find(
            {
                companyId: user.companyId,
                parent: 'ROOT'
            },
            {
                sort: {
                    weight: 1
                }
            }
        ).fetch();
    },
    'mainMenus.insert': function (mainMenu) {
        // check permission
        aclAccess('MainMenus', 'Create');

        check(mainMenu, Object);
        if (typeof mainMenu.parent !== 'undefined') {
            if (!mainMenu.parent) {
                mainMenu.parent = 'ROOT';
            }
        }

        return MainMenus.insert(mainMenu);
    },
    'mainMenus.update': function (mainMenu) {
        // check permission
        aclAccess('MainMenus', 'Edit');

        check(mainMenu, Object);
        if (typeof mainMenu.parent !== 'undefined') {
            if (!mainMenu.parent) {
                mainMenu.parent = 'ROOT';
            }
        }

        try {
            const menuId = mainMenu._id;
            MainMenus.update(menuId, {$set: mainMenu});
            return menuId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    }
});
