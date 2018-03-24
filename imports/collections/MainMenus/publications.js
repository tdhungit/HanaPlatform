import {Meteor} from 'meteor/meteor';
import MainMenus from './MainMenus';

Meteor.publish('mainMenus.list', () => {
    return MainMenus.publish(Meteor.user(), {});
});

Meteor.publish('mainMenus.detail', (menuId) => {
    return MainMenus.publish(Meteor.user(), {_id: menuId});
});
