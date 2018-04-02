export const frameworkConfig = {

};

export const modulesComponent = {
    layout: ['ManagerLayout'],
    components: {
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
        }
    }
};
