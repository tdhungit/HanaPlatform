import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import MainMenus from './MainMenus';

Meteor.methods({
    'mainMenus.ROOT': function () {
        return MainMenus.find({parent: 'ROOT'}, {
            sort: {
                weight: 1
            }
        }).fetch();
    },
    'mainMenus.Nav': function () {
        const menu_root = MainMenus.find({parent: 'ROOT'}, {
            sort: {
                weight: 1
            }
        }).fetch();
        let menus = [];
        for (let idx in menu_root) {
            let menu = menu_root[idx];
            let menu_children = MainMenus.find({parent: menu._id}, {
                sort: {
                    weight: 1
                }
            }).fetch();
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
