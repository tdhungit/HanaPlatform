const coreCollections = [
    'Users',
    'UserGroups',
    'Permissions',
    'MainMenus',
    'Activities',
    'SaleOrders'
];

const customCollections = [];

const existCollections = [
    ...coreCollections,
    ...customCollections,
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
    customCollections,
    existCollections,
    modules
};
