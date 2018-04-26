import {modulesCollections} from '../modules/collections.modules';

const customCollections = [...modulesCollections];
const coreCollections = [
    'Users',
    'UserGroups',
    'Permissions',
    'MainMenus',
    'Activities',
    ...customCollections
];

const existCollections = [
    ...coreCollections,
    'Accounts',
    'Roles',
    'Models',
    'Media'
];

const modules = [
    'Core'
];

export {
    coreCollections,
    existCollections,
    modules
};
