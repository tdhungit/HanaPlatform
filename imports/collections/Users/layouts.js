export const userLayouts = {
    icon: "fa fa-user",
    list: {
        title: "username",
        fields: {
            username: {
                type: "text",
                label: "Username"
            },
            emails: {
                label: "Emails",
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
                emails: {
                    label: "Emails",
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
                },
                password: {
                    type: "text",
                    label: "Password"
                }
            }
        ]
    }
};