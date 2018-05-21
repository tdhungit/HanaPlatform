import {navModules} from '../../../../modules/nav.modules';

export default {
    first_items: [
        {
            name: 'Dashboard',
            url: '/manager/dashboard',
            icon: 'icon-speedometer',
        },
        {
            name: 'Discuss',
            url: '/manager/chats',
            icon: 'fa fa-comments',
        },
    ],
    items: [...navModules],
    last_items: [
        {
            name: 'Companies',
            icon: 'fa fa-building',
            children: [
                {
                    name: 'View Companies',
                    url: '/manager/companies',
                    icon: 'fa fa-building'
                },
                {
                    name: 'View Branches',
                    url: '/manager/branch-offices',
                    icon: 'fa fa-building'
                }
            ]
        },
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
            name: 'Activities',
            icon: 'fa fa-calendar-check-o',
            children: [
                {
                    name: 'Calendar',
                    url: '/manager/activities/calendar',
                    icon: 'icon-calendar'
                },
                {
                    name: 'View Activities',
                    url: '/manager/activities',
                    icon: 'fa fa-calendar-check-o'
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
                },
                {
                    name: 'Module Builder',
                    url: '/manager/models',
                    icon: 'icon-wrench'
                },
                {
                    name: 'Dropdown List',
                    url: '/manager/settings/dropdown-list',
                    icon: 'icon-list'
                }
            ]
        }
    ]
};
