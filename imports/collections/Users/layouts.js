export const userLayouts = {
    icon: "fa fa-user",
    list: {
        title: "username",
        fields: {
            username: {
                type: "text",
                label: "Username"
            },
            email: {
                label: "Email",
                alias: 'emails',
                display: {
                    type: 'array',
                    fields: ['address']
                }
            },
            "profile.firstName": {
                type: "text",
                label: "First Name"
            },
            "profile.lastName": {
                type: "text",
                label: "Last Name"
            }
        }
    },
    view: {
        title: "username",
        fields: [
            {
                username: {
                    type: "text",
                    label: "Username"
                },
                email: {
                    label: "Email",
                    alias: 'emails',
                    display: {
                        type: 'array',
                        fields: ['address']
                    }
                }
            },
            {
                "profile.firstName": {
                    type: "text",
                    label: "First Name"
                },
                "profile.lastName": {
                    type: "text",
                    label: "Last Name"
                }
            },
            {
                groupId: {
                    type: "userGroup",
                    label: "Group"
                }
            }
        ]
    }
};