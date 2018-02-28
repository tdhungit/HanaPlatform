export default {
    first_items: [
        {
            name: 'Dashboard',
            url: '/manager/dashboard',
            icon: 'icon-speedometer',
            badge: {
                variant: 'info',
                text: 'NEW'
            }
        },
    ],
    last_items: [
        {
            name: 'Users',
            icon: 'icon-user',
            children: [
                {
                    name: 'View Users',
                    url: '/manager/users',
                    icon: 'icon-user'
                },
                {
                    name: 'View User Groups',
                    url: '/manager/user-groups',
                    icon: 'icon-people'
                },
                {
                    name: 'View Roles',
                    url: '/manager/roles',
                    icon: 'icon-lock'
                }
            ]
        },
        {
            name: 'Settings',
            icon: 'icon-wrench',
            children: [
                {
                    name: 'Sidebar Menu',
                    url: '/manager/main-menus',
                    icon: 'icon-menu'
                },
                {
                    name: 'System Settings',
                    url: '/manager/settings',
                    icon: 'fa fa-cogs'
                }
            ]
        }
    ]
};
