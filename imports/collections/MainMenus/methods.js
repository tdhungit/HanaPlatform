import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import MainMenus from './MainMenus';

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
    // get all menus with tree
    'mainMenus.Nav': function () {
        const user = Meteor.user();
        const menu_root = MainMenus.find(
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

        let menus = [];
        for (let idx in menu_root) {
            let menu = menu_root[idx];
            let menu_children = MainMenus.find(
                {
                    companyId: user.companyId,
                    parent: menu._id
                },
                {
                    sort: {
                        weight: 1
                    }
                }
            ).fetch();

            if (menu_children.length > 0) {
                menu.children = menu_children;
            }

            menus.push(menu);
        }

        return menus;
    },
    'mainMenus.insert': function (mainMenu) {
        check(mainMenu, Object);
        if (typeof mainMenu.parent != 'undefined') {
            if (!mainMenu.parent) {
                mainMenu.parent = 'ROOT';
            }
        }

        return MainMenus.insert(mainMenu);
    },
    'mainMenus.update': function (mainMenu) {
        check(mainMenu, Object);
        if (typeof mainMenu.parent != 'undefined') {
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
