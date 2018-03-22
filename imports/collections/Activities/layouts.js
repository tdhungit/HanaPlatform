export const activityLayouts = {
    icon: "fa fa-calendar",
    list: {
        title: "name",
        fields: {
            name: {
                type: "text",
                label: "Subject"
            }
        }
    },
    view: {
        title: "name",
        fields: [
            {
                name: {
                    type: "text",
                    label: "Subject"
                },
                type: {
                    type: "select",
                    label: "Type",
                    options: "ActivityTypes"
                }
            },
            {
                dateStart: {
                    type: "datetime",
                    label: "Data Start"
                },
                dateEnd: {
                    type: "datetime",
                    label: "Data End"
                }
            },
            {
                "conferencing.type": {
                    type: "select",
                    label: "Conferencing",
                    options: "ConferencingList"
                },
                "conferencing.name": {
                    type: "text",
                    label: "Conferencing name"
                }
            },
            {
                notifications: {
                    type: "array",
                    fields: {
                        type: {
                            type: "select",
                            label: "Type"
                        }
                    },
                    label: "Notifications"
                }
            }
        ]
    }
};