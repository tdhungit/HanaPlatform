export const frameworkConfig = {
    currency: {
        symbol: 'đ',
        symbolPos: 'suffix',
        format: null
    },
    Permissions: {
        defaultAccess: true,
        defaultData: 'All'
    }
};

const controllers = {
    Users: null,
    ACL: null,
    Companies: null
};
export const modulesComponent = {
    layout: ['ManagerLayout'],
    defaultActions: ['List', 'View', 'Create', 'Edit', 'Delete'],
    controllers: controllers
};
