export const companyLayouts = {
    icon: 'fa fa-building',
    list: {
        title: "name",
        fields: {
            name: {
                type: "text",
                label: "Name"
            },
            domain: {
                type: "text",
                label: "Domain"
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
                domain: {
                    type: "text",
                    label: "Domain"
                }
            }
        ]
    }
};