export const branchOfficeLayouts = {
    icon: 'fa fa-cogs',
    list: {
        title: "name",
        fields: {
            name: {
                type: "text",
                label: "Name"
            },
            type: {
                type: 'dropdown',
                label: 'Type',
                props: {
                    options: 'BranchOfficeTypesList'
                }
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
                type: {
                    type: 'dropdown',
                    label: 'Type',
                    props: {
                        options: 'BranchOfficeTypesList'
                    }
                }
            },
            {
                phone: {
                    type: "text",
                    label: "Phone"
                },
                description: {
                    type: "textarea",
                    label: "Description"
                }
            }
        ]
    }
};
