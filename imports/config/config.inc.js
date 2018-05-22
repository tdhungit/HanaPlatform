export const frameworkConfig = {
    Permissions: {
        defaultAccess: true,
        defaultData: 'All'
    },
    dbDateFormat: {
        date: 'YYYY-MM-DD',
        datetime: 'YYYY-MM-DD HH:mm:ss'
    },
    currency: {
        symbol: 'đ',
        symbolPos: 'suffix',
        format: null
    },
};

export const modulesComponent = {
    layout: ['ManagerLayout', 'HomeLayout'],
    // default actions in a controller
    defaultActions: ['List', 'View', 'Create', 'Edit', 'Delete'],
    // only admin can access
    adminControllers: {
        ACL: 1,
        Settings: 1,
        Models: 1,
        Users: {
            Create: 1
        }
    },
    // controllers for set permission
    controllers: {
        Users: null,
        Companies: null
    }
};
