import {Meteor} from 'meteor/meteor';
import MainMenus from './MainMenus';

Meteor.publish('mainMenus.list', function () {
    return MainMenus.publish(Meteor.user(), {});
});

Meteor.publish('mainMenus.detail', function (menuId) {
    return MainMenus.publish(Meteor.user(), {_id: menuId});
});
