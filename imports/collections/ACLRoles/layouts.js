export const aclRoleLayouts = {
    icon: "fa fa-user",
    list: {
        title: "name",
        fields: {
            name: {
                type: "text",
                label: "Name"
            }
        }
    },
    view: {
        title: "name",
        fields: [
            {
                name: {
                    type: "text",
                    label: "Name"
                }
            },
            {
                description: {
                    type: 'textarea',
                    label: "Description"
                }
            }
        ]
    }
};