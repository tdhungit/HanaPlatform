export const frameworkConfig = {
    currency: {
        symbol: 'đ',
        symbolPos: 'suffix',
        format: null
    }
};

export const modulesComponent = {
    layout: ['ManagerLayout'],
    components: {
        // users
        ViewUsers: {
            module: 'Users',
            action: 'List'
        },
        CreateUser: {
            module: 'Users',
            action: 'Create'
        },
        ViewUser: {
            module: 'Users',
            action: 'View'
        },
        EditUser: {
            module: 'Users',
            action: 'Edit'
        },
        // roles
        ViewRoles: {
            module: 'ACLRoles',
            action: 'List'
        },
        ViewRole: {
            module: 'ACLRoles',
            action: 'View'
        }
    }
};
