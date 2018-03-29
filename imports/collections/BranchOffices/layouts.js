export const branchOfficeLayouts = {
    icon: 'fa fa-cogs',
    list: {
        title: "name",
        fields: {
            name: {
                type: "text",
                label: "Name"
            },
            phone: {
                type: "text",
                label: "Phone"
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
                },
                phone: {
                    type: "text",
                    label: "Phone"
                }
            },
            {
                description: {
                    type: "textarea",
                    label: "Description"
                }
            }
        ]
    }
};